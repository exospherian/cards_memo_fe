import { Component, For, Show, onMount } from "solid-js";
import { useService } from "solid-services";
import { CircularProgress, ButtonGroup, Button } from "@suid/material";
import { useNavigate } from "@solidjs/router";
import { useBackButton } from "../hooks";
import { DictionaryService } from "../services";
import { useTranslation } from "../providers";
import { Dictionary, DictionaryType } from "../models";
import { BaseList, BaseWrapper, MainButton } from "../components";
import { capitalized } from "../utils/transforms";

const Dictionaries: Component = () => {
  const navigate = useNavigate();
  const backButton = useBackButton();
  const translation = useTranslation();
  const dictionaryService = useService(DictionaryService);
  const activeTab = () => dictionaryService().type();
  const dictionaries = dictionaryService().dictionaries;

  onMount(() => {
    backButton().show();
    if (!dictionaryService().type()) {
      dictionaryService().setType(DictionaryType.PRIVATE);
    }
  });

  const onClick = (item: Dictionary) => {
    if (dictionaryService().type() === DictionaryType.PRIVATE) {
      return navigate(`/dictionary/private/${item.id}`);
    }
    if (dictionaryService().type() === DictionaryType.PUBLIC) {
      return navigate(`/dictionary/public/${item.id}`);
    }
  };

  const onTabChange = (type: DictionaryType) => {
    dictionaryService().setType(type);
  };

  return (
    <BaseWrapper>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        fullWidth={true}
      >
        <For each={[DictionaryType.PRIVATE, DictionaryType.PUBLIC]}>
          {(type) => (
            <Button
              variant={type === activeTab() ? "contained" : "outlined"}
              onClick={() => onTabChange(type)}
            >
              {capitalized(translation.t(`dictionaries.tab.${type}`))}
            </Button>
          )}
        </For>
      </ButtonGroup>
      <Show
        when={!dictionaries.loading}
        fallback={
          <CircularProgress sx={{ alignSelf: "center" }} color="primary" />
        }
      >
        <BaseList
          items={dictionaries()}
          onClick={onClick}
          mainField={"name"}
          emptyText={translation.t("dictionaries.notFound")}
        />
      </Show>
      <MainButton
        text={translation.t("dictionaries.button")}
        onClick={() => navigate("/dictionary/add")}
      />
    </BaseWrapper>
  );
};

export default Dictionaries;
