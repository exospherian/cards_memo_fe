import { BaseWrapper } from "../../components";
import { StudyService } from "../../services";
import { Component, Show, onCleanup, onMount } from "solid-js";
import { useService } from "solid-services";
import { Button, CircularProgress, Stack, Typography } from "@suid/material";
import { useNavigate } from "@solidjs/router";
import { Study } from "./Study";
import { useTranslation } from "../../providers";

const GlobalStudy: Component = () => {
  const studyService = useService(StudyService);
  const translation = useTranslation();
  const navigate = useNavigate();

  onMount(() => {
    studyService().findAll();
  });

  onCleanup(() => {
    studyService().updateProgress();
  });

  return (
    <BaseWrapper>
      <Show
        when={!studyService().store.loading}
        fallback={
          <CircularProgress sx={{ alignSelf: "center" }} color="primary" />
        }
      >
        <Show
          when={studyService().store.words.length}
          fallback={
            <>
              <Typography
                color="text.primary"
                variant="h6"
                component="h2"
                mb={1}
              >
                {translation.t("study.empty.title")}
              </Typography>
              <Typography color="text.primary">
                {translation.t("study.empty.subTitle")}
              </Typography>
              <Stack direction="row" gap={1}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  onClick={() => navigate("/public-dictionaries")}
                >
                  {translation.t("study.empty.button.public")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  onClick={() => navigate("/dictionary/add")}
                >
                  {translation.t("study.empty.button.private")}
                </Button>
              </Stack>
            </>
          }
        >
          <Study onComplete={() => console.log("complete")} global={true} />
        </Show>
      </Show>
    </BaseWrapper>
  );
};

export default GlobalStudy;
