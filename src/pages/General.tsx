import { useNavigate } from "@solidjs/router";
import { useHapticFeedback, useMainButton } from "../hooks";
import { useTranslation } from "../providers/TranslationProvider";
import { Grid, Paper, Typography, styled } from "@suid/material";
import { onMount } from "solid-js";
import { useService } from "solid-services";
import { DictionaryService } from "../services";
import { BaseWrapper } from "../components";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
}));

const General = () => {
  const navigate = useNavigate();
  const haptic = useHapticFeedback();
  const mainButton = useMainButton();
  const translation = useTranslation();
  const dictionaryService = useService(DictionaryService);

  onMount(() => {
    dictionaryService().setType();
    mainButton().hide();
  });

  const onClick = (path: string) => {
    haptic().impactOccurred("soft");
    navigate(path);
  };

  return (
    <BaseWrapper>
      <Grid container columnSpacing={1} rowSpacing={1} sx={{ height: "100%" }}>
        <Grid item xs={12}>
          <Item onClick={() => onClick("/dictionaries")}>
            <Typography variant="button">
              {translation.t("general.sections.dictionaries")}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item onClick={() => onClick("/public-dictionaries")}>
            <Typography variant="button">
              {translation.t("general.sections.publicDictionaries")}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item onClick={() => onClick("/global-study")}>
            <Typography variant="button">
              {translation.t("general.sections.memorize")}
            </Typography>
          </Item>
        </Grid>
        {/* <Grid item xs={6}>
          <Item onClick={() => onClick("/dictionaries")}>
            <Typography variant="button" sx={{ display: "block" }} gutterBottom>
              {translation.t("general.sections.progress")}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item onClick={() => onClick("/dictionaries")}>
            <Typography variant="button" sx={{ display: "block" }} gutterBottom>
              {translation.t("general.sections.contacts")}
            </Typography>
          </Item>
        </Grid> */}
      </Grid>
    </BaseWrapper>
  );
};

export default General;
