import { Component, Show, createSignal, onMount } from "solid-js";
import { useBackButton, useMainButton } from "../hooks";
import { useNavigate } from "@solidjs/router";
import { Box, Button, CircularProgress, Typography } from "@suid/material";
import {
  BaseList,
  BaseModal,
  BaseWrapper,
  DoubleSelect,
  TagsFormField,
} from "../components";
import { useService } from "solid-services";
import { DictionaryService, TagsService } from "../services";
import { Dictionary, DictionaryFilter, DictionaryType } from "../models";
import { createFormStore, getValues, validate } from "@modular-forms/solid";
import { languageOptions, useTranslation } from "../providers";

const PublicDictionaries: Component = () => {
  const navigate = useNavigate();
  const backButton = useBackButton();
  const mainButton = useMainButton();
  const translation = useTranslation();
  const dictionaryService = useService(DictionaryService);
  const tagsService = useService(TagsService);
  const [open, setOpen] = createSignal(false);
  const filterForm = createFormStore<DictionaryFilter>({
    initialValues: dictionaryService().filters,
    validateOn: "input",
  });

  onMount(() => {
    backButton().show();
    mainButton().hide();
    dictionaryService().setType(DictionaryType.GLOBAL);
  });

  const onClick = (item: Dictionary) => {
    navigate(`/dictionary/global/${item.id}`);
  };

  const fetchDictionary = async () => {
    const isValid = await validate(filterForm);
    if (isValid) {
      const filter = getValues(filterForm) as DictionaryFilter;
      dictionaryService().updateFilters(filter);
      setOpen(false);
    }
  };

  return (
    <BaseWrapper>
      <Button
        variant="contained"
        color="primary"
        fullWidth={true}
        onClick={() => setOpen(true)}
      >
        {translation.t("publicDictionaries.filter.button")}
      </Button>
      <Show
        when={!dictionaryService().dictionaries.loading}
        fallback={
          <CircularProgress sx={{ alignSelf: "center" }} color="primary" />
        }
      >
        <BaseList
          items={dictionaryService().dictionaries()}
          onClick={onClick}
          mainField={"name"}
          emptyText={translation.t("publicDictionaries.notFound")}
        />
      </Show>

      <BaseModal
        open={open()}
        overlap={true}
        acceptText={translation.t("publicDictionaries.filter.acceptText")}
        type="base"
        loading={dictionaryService().loading()}
        disabled={filterForm.invalid}
        onClose={(done) => (done ? fetchDictionary() : setOpen(false))}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography color="text.primary" variant="h6" component="h2" mb={1}>
            {translation.t("publicDictionaries.filter.title")}
          </Typography>
          <DoubleSelect
            form={filterForm}
            firstName="from"
            firstLabel={translation.t(
              "addEditDictionary.basic.form.from.label"
            )}
            secondName="to"
            secondLabel={translation.t("addEditDictionary.basic.form.to.label")}
            equals={translation.t("addEditDictionary.basic.form.to.existError")}
            options={languageOptions}
            required={translation.t(
              "addEditDictionary.basic.form.from.emptyError"
            )}
          />
          <TagsFormField
            form={filterForm}
            label={translation.t("tags.label")}
            name="tags"
            tags={tagsService().tags() ?? []}
          />
        </Box>
      </BaseModal>
    </BaseWrapper>
  );
};

export default PublicDictionaries;
