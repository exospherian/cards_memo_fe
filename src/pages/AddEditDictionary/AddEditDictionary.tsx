import { Component, Show } from "solid-js";
import {
  DictionaryCreateDto,
  DictionaryForm,
  DictionaryUpdateDto,
} from "../../models";
import { useService } from "solid-services";
import { AuthService, DictionaryService, TagsService } from "../../services";
import {
  validate,
  getValues,
  insert,
  remove,
  getValue,
  createFormStore,
  PartialValues,
} from "@modular-forms/solid";
import { languageOptions, useNavigator, useTranslation } from "../../providers";
import {
  DoubleSelect,
  Step,
  TagsFormField,
  TextFormField,
  Wizard,
} from "../../components";
import { Button } from "@suid/material";
import { WordFormContent } from "./WordForm";

const AddEditDictionary: Component = () => {
  const navigator = useNavigator();
  const translation = useTranslation();
  const deletedWordIds: string[] = [];
  const dictionaryService = useService(DictionaryService);
  const tagsService = useService(TagsService);
  const authService = useService(AuthService);
  const dictionary = () => dictionaryService().dictionary();
  const user = () => authService().store.user;
  const dictionaryForm = createFormStore<DictionaryForm>({
    initialValues: {
      general: {
        name: dictionary()?.name,
        from: dictionary()?.from || user()?.defaultFrom,
        to: dictionary()?.to || user()?.defaultTo,
        description: dictionary()?.description,
        tags: dictionary()?.tags ?? [],
      },
      updatedWords: dictionary()?.words ?? [],
      createdWords: [],
    },
    validateOn: "blur",
  });

  const getTitle = () =>
    dictionary()?.name ?? translation.t("addEditDictionary.basic.title");

  const getDictionaryCreatingPayload = (
    formData: PartialValues<DictionaryForm>
  ) => {
    return {
      ...formData.general,
      from: getValue(dictionaryForm, `general.from`, { shouldActive: false }),
      to: getValue(dictionaryForm, `general.to`, { shouldActive: false }),
      words:
        formData.createdWords?.map((word) => ({ ...word, order: 0 })) ?? [],
    } as DictionaryCreateDto;
  };

  const getDictionaryUpdatingPayload = (
    formData: PartialValues<DictionaryForm>
  ) => {
    return {
      ...formData.general,
      delete: deletedWordIds,
      updateWords:
        formData.updatedWords
          ?.map((item, index) => {
            return {
              ...item,
              id: getValue(dictionaryForm, `updatedWords.${index}.id`, {
                shouldActive: false,
                shouldDirty: false,
              }),
            };
          })
          ?.filter(Boolean) ?? [],
      words:
        formData.createdWords?.map((word) => ({ ...word, order: 0 })) ?? [],
    } as DictionaryUpdateDto;
  };

  const onSubmit = async () => {
    const isValid = await validate(dictionaryForm);
    if (!isValid) return false;

    const dictionaryData = getValues(dictionaryForm, {
      shouldActive: false,
      shouldDirty: true,
      shouldValid: true,
    });

    const id = dictionary()?.id;
    try {
      if (id) {
        await dictionaryService().update(
          getDictionaryUpdatingPayload(dictionaryData)
        );
      } else {
        await dictionaryService().create(
          getDictionaryCreatingPayload(dictionaryData)
        );
      }
      navigator?.back();
      return true;
    } catch (error) {
      return false;
    }
  };

  const onAdd = () => {
    insert(dictionaryForm, "createdWords", {
      at: 0,
      value: {
        from: "",
        to: "",
        order: 0,
        transcription: "",
        description: "",
      },
    });
  };

  const onRemoveUpdated = (index: number) => {
    const removedWordId = getValue(dictionaryForm, `updatedWords.${index}.id`, {
      shouldActive: false,
      shouldDirty: false,
    });
    if (removedWordId) {
      deletedWordIds.push(removedWordId);
      remove(dictionaryForm, "updatedWords", { at: index });
    }
  };

  const onRemoveCreated = (index: number) => {
    remove(dictionaryForm, "createdWords", { at: index });
  };

  const generalInfoValidator = async () => {
    return validate(dictionaryForm);
  };

  const getFromValue = (): string => {
    return getValue(dictionaryForm, "general.from", {
      shouldActive: false,
    }) as string;
  };

  const getToValue = (): string => {
    return getValue(dictionaryForm, "general.to", {
      shouldActive: false,
    }) as string;
  };

  return (
    <Wizard>
      <Step
        title={getTitle()}
        buttonTitle={translation.t("addEditDictionary.basic.button")}
        onNext={generalInfoValidator}
      >
        <TextFormField
          form={dictionaryForm}
          name="general.name"
          label={translation.t("addEditDictionary.basic.form.name.label")}
          required={translation.t(
            "addEditDictionary.basic.form.name.emptyError"
          )}
        />
        <DoubleSelect
          form={dictionaryForm}
          firstName="general.from"
          firstLabel={translation.t("addEditDictionary.basic.form.from.label")}
          secondName="general.to"
          secondLabel={translation.t("addEditDictionary.basic.form.to.label")}
          equals={translation.t("addEditDictionary.basic.form.to.existError")}
          options={languageOptions}
          disabled={!!dictionary()}
          required={translation.t(
            "addEditDictionary.basic.form.from.emptyError"
          )}
        />
        <TextFormField
          form={dictionaryForm}
          name="general.description"
          label={translation.t("addEditDictionary.basic.form.description")}
          maxRows={4}
          multiline
        />
        <TagsFormField
          form={dictionaryForm}
          label={translation.t("tags.label")}
          name="general.tags"
          tags={tagsService().tags() ?? []}
        />
      </Step>
      <Step
        title={translation.t("addEditDictionary.words.title")}
        onNext={onSubmit}
        buttonTitle={
          dictionary()
            ? translation.t("addEditDictionary.words.button.edit")
            : translation.t("addEditDictionary.words.button.add")
        }
      >
        <Button variant="contained" onClick={onAdd}>
          {translation.t("addEditDictionary.words.form.addButton")}
        </Button>
        <WordFormContent
          form={dictionaryForm}
          name="createdWords"
          onRemove={onRemoveCreated}
          from={getFromValue()}
          to={getToValue()}
        />
        <Show when={dictionary()}>
          <WordFormContent
            form={dictionaryForm}
            name="updatedWords"
            from={getFromValue()}
            to={getToValue()}
            onRemove={onRemoveUpdated}
          />
        </Show>
      </Step>
    </Wizard>
  );
};

export default AddEditDictionary;
