import { Component, For, Match, Show, Switch, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useNavigator, useTranslation } from "../providers";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@suid/material";
import { useService } from "solid-services";
import DeleteIcon from "@suid/icons-material/Delete";
import PublicIcon from "@suid/icons-material/Public";
import ShareIcon from "@suid/icons-material/Share";
import SchoolIcon from "@suid/icons-material/School";
import { MainButton } from "../components/MainButton";
import { dateTransform } from "../utils/transforms";
import { DictionaryService, TagsService } from "../services";
import { BaseList, BaseModal, BaseWrapper, TagsFormField } from "../components";
import {
  DictionaryAction,
  DictionaryType,
  dictionaryActionsByType,
} from "../models";
import { createStore } from "solid-js/store";
import {
  createFormStore,
  getValues,
  required,
  validate,
} from "@modular-forms/solid";
import ISO6391 from "iso-639-1";
import { ExpandLess, ExpandMore } from "@suid/icons-material";

const Dictionary: Component = () => {
  const navigate = useNavigate();
  const navigator = useNavigator();
  const translation = useTranslation();
  const dictionaryService = useService(DictionaryService);
  const tagsService = useService(TagsService);
  const dictionary = () => dictionaryService().dictionary();
  const dictionaryPayload = () => dictionaryService().dictionaryPayload();
  const tagsForm = createFormStore<{ tags: number[] }>({
    initialValues: {
      tags: dictionary()?.tags ?? [],
    },
  });
  const [modalStore, setModalStore] = createStore<{
    open: boolean;
    action?: DictionaryAction;
    acceptText?: string;
    type?: "base" | "danger";
    loading: boolean;
    actionHandler: () => void;
  }>({
    open: false,
    loading: false,
    actionHandler: async () => {},
  });
  const [expanded, setExpended] = createSignal(false);

  const onSubAction = (action: DictionaryAction) => {
    switch (action) {
      case DictionaryAction.DELETE:
        return setModalStore({
          action,
          open: true,
          acceptText: translation.t("dictionary.modal.delete.acceptText"),
          type: "danger",
          actionHandler: async () => {
            setModalStore({ loading: true });
            await dictionaryService().onDelete();
            navigator?.back();
          },
        });
      case DictionaryAction.PUBLISH:
        return setModalStore({
          action,
          open: true,
          acceptText: translation.t("dictionary.modal.publish.acceptText"),
          type: "base",
          actionHandler: async () => {
            const isValid = await validate(tagsForm);
            if (!isValid) return;
            setModalStore({ loading: true });
            await dictionaryService().onPublish(
              getValues(tagsForm).tags as number[]
            );
            setModalStore({ open: false, loading: false });
          },
        });
      case DictionaryAction.SHARE:
        const startParamVal = btoa(
          JSON.stringify({ dictionaryId: dictionary()?.id })
        );
        return window.navigator.share({
          title: translation.t("dictionary.share.title"),
          url: `https://t.me/MemoRecallBot/MemoRecall?startapp=${startParamVal}`,
        });

      case DictionaryAction.STUDY:
        return navigate("study");
    }
  };

  const onMainAction = (type: DictionaryType) => {
    if (type === DictionaryType.GLOBAL) {
      // if (dictionaryService().dictionary()?.dictionaryId) {
      //   return setModalStore({
      //     action: DictionaryAction.ADD,
      //     open: true,
      //     acceptText: translation.t("dictionary.modal.add.acceptText"),
      //     type: "base",
      //     actionHandler: async () => {
      //       setModalStore({ loading: true });
      //       await dictionaryService().onAdd();
      //       setModalStore({ open: false, loading: false });
      //     },
      //   });
      // }
      return dictionaryService().onAdd();
    }
    return navigate("edit");
  };

  const getMainButtonText = (type: DictionaryType) => {
    if (type === DictionaryType.GLOBAL) {
      return translation.t(`dictionary.buttons.add`);
    }
    return translation.t(`dictionary.buttons.edit`);
  };

  return (
    <BaseWrapper>
      <Show
        when={!dictionaryService().dictionary.loading}
        fallback={
          <CircularProgress sx={{ alignSelf: "center" }} color="primary" />
        }
      >
        <Card
          sx={{ display: "flex", flexDirection: "column", overflow: "unset" }}
        >
          <CardContent
            sx={{
              flex: "1 0 auto",
              "&:last-child": {
                paddingBottom: 2,
              },
            }}
          >
            <Box displayRaw="flex" justifyContent="space-between">
              <Typography variant="h5">{dictionary()?.name}</Typography>
              <Show
                when={
                  dictionary()?.id ===
                    dictionaryService().publisher()?.dictionaryId ||
                  dictionary()?.childPublicDictionaryId
                }
              >
                <Typography variant="h6" color="success.main">
                  {translation.t("dictionary.published")}
                </Typography>
              </Show>
            </Box>

            <Typography variant="subtitle2" color="text.secondary">
              {translation.t("dictionary.language", {
                from: ISO6391.getName(dictionary()?.from!),
                to: ISO6391.getName(dictionary()?.to!),
              })}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {translation.t("dictionary.created", {
                created: dateTransform(dictionary()?.created),
              })}
            </Typography>
            <Show when={dictionary()?.countOfDownload}>
              {(count) => {
                return (
                  <Typography variant="subtitle2" color="text.secondary">
                    {translation.t("dictionary.downloadCount", {
                      count: count(),
                    })}
                  </Typography>
                );
              }}
            </Show>
          </CardContent>
          <Show when={dictionary()?.description}>
            <Divider />
            <CardActions
              sx={{
                paddingRight: 2,
                paddingLeft: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={() => setExpended(!expanded())}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {translation.t("dictionary.description")}
              </Typography>
              {expanded() ? <ExpandLess /> : <ExpandMore />}
            </CardActions>
            <Show when={expanded()}>
              <CardContent>
                <Typography>{dictionary()?.description}</Typography>
              </CardContent>
            </Show>
          </Show>
        </Card>
        <ButtonGroup
          size="large"
          aria-label="vertical outlined primary button group"
        >
          <For each={dictionaryActionsByType[dictionaryPayload()?.type!]?.sub}>
            {(action) => (
              <Button
                sx={{
                  flex: 1,
                  "& .MuiButton-startIcon": {
                    margin: 0,
                  },
                }}
                startIcon={
                  <Switch>
                    <Match when={action === DictionaryAction.DELETE}>
                      <DeleteIcon />
                    </Match>
                    <Match when={action === DictionaryAction.PUBLISH}>
                      <PublicIcon />
                    </Match>
                    <Match when={action === DictionaryAction.SHARE}>
                      <ShareIcon />
                    </Match>
                    <Match when={action === DictionaryAction.STUDY}>
                      <SchoolIcon />
                    </Match>
                  </Switch>
                }
                onClick={() => onSubAction(action)}
              />
            )}
          </For>
        </ButtonGroup>
        <BaseList
          items={dictionary()?.words ?? []}
          mainField={"from"}
          expandedFields={[
            {
              key: "to",
              label: translation.t("dictionary.word.translation"),
            },
            {
              key: "transcription",
              label: translation.t("dictionary.word.transcription"),
            },
            {
              key: "description",
              label: translation.t("dictionary.word.desctiption"),
            },
          ]}
          emptyText={translation.t("dictionary.notFound")}
        />
        <MainButton
          text={getMainButtonText(dictionaryPayload()?.type!)}
          onClick={() => onMainAction(dictionaryPayload()?.type!)}
          loading={dictionaryService().adder.loading}
        />
        <BaseModal
          open={modalStore.open}
          acceptText={modalStore.acceptText}
          type={modalStore.type}
          loading={modalStore.loading}
          disabled={
            modalStore.action === DictionaryAction.PUBLISH
              ? tagsForm.invalid
              : false
          }
          onClose={async (done) => {
            if (modalStore.loading) return;
            if (done) {
              await modalStore.actionHandler();
            } else {
              setModalStore({ open: false, loading: false });
            }
          }}
        >
          <Switch>
            <Match when={modalStore.action === DictionaryAction.DELETE}>
              <Typography
                color="text.primary"
                variant="h6"
                component="h2"
                mb={1}
              >
                {translation.t("dictionary.modal.delete.title")}
              </Typography>
              <Typography color="text.primary">
                {translation.t("dictionary.modal.delete.subTitle")}
              </Typography>
            </Match>
            <Match when={modalStore.action === DictionaryAction.PUBLISH}>
              <Typography
                color="text.primary"
                variant="h6"
                component="h2"
                mb={1}
              >
                {translation.t("dictionary.modal.publish.title")}
              </Typography>
              <Typography color="text.primary">
                {translation.t("dictionary.modal.publish.subTitle")}
              </Typography>
              <TagsFormField
                form={tagsForm}
                label={translation.t("tags.label")}
                name="tags"
                tags={tagsService().tags() ?? []}
                required
                validate={[required(translation.t("tags.required"))]}
              />
            </Match>
            <Match when={modalStore.action === DictionaryAction.ADD}>
              <Typography
                color="text.primary"
                variant="h6"
                component="h2"
                mb={1}
              >
                {translation.t("dictionary.modal.add.title")}
              </Typography>
              <Typography color="text.primary">
                {translation.t("dictionary.modal.add.subTitle")}
              </Typography>
            </Match>
          </Switch>
        </BaseModal>
      </Show>
    </BaseWrapper>
  );
};

export default Dictionary;
