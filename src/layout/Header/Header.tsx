import {
  Component,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { useLocation } from "@solidjs/router";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
} from "@suid/material";
import { useService } from "solid-services";
import { AuthService, Settings } from "../../services";
import { useSettingsButton } from "@tma.js/sdk-solid";
import { BaseModal, DoubleSelect } from "../../components";
import { languageOptions, useTranslation } from "../../providers";
import {
  createFormStore,
  getValues,
  reset,
  validate,
} from "@modular-forms/solid";
import ISO6391 from "iso-639-1";

export const Header: Component = () => {
  const authService = useService(AuthService);
  const settingsButton = useSettingsButton();
  const location = useLocation();
  const translation = useTranslation();
  const user = () => authService().store.user;
  const [settingsOpen, setSettingsOpen] = createSignal(
    !(user()?.defaultFrom && user()?.defaultTo)
  );
  const settignsForm = createFormStore<Settings>({
    initialValues: {
      defaultFrom: user()?.defaultFrom,
      defaultTo: user()?.defaultTo,
    },
    validateOn: "input",
  });

  createEffect(() => {
    reset(settignsForm, {
      initialValues: {
        defaultFrom: user()?.defaultFrom!,
        defaultTo: user()?.defaultTo!,
      },
    });
  });

  const onOpenSettings = () => {
    if (user()?.defaultFrom && user()?.defaultTo) {
      setSettingsOpen(!settingsOpen());
    }
  };

  const onUpdateSettings = async () => {
    const isValid = await validate(settignsForm);
    if (isValid) {
      await authService().updateSettings(getValues(settignsForm) as Settings);
      setSettingsOpen(false);
    }
  };

  onMount(() => {
    settingsButton().show();
    settingsButton().on("click", onOpenSettings);
  });

  onCleanup(() => {
    settingsButton().hide();
    settingsButton().off("click", onOpenSettings);
  });

  const fromLang = () => {
    return ISO6391.getName(user()?.defaultFrom!);
  };

  const toLang = () => {
    return ISO6391.getName(user()?.defaultTo!);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Avatar alt={user()?.nickname} src={""}>
              {user()?.nickname.charAt(0)}
            </Avatar>
          </IconButton>
          <Show when={user()?.defaultFrom && user()?.defaultTo}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {`${fromLang()} - ${toLang()}`}
            </Typography>
          </Show>
        </Toolbar>
      </AppBar>
      <BaseModal
        open={settingsOpen()}
        acceptText={translation.t("settings.button")}
        type="base"
        overlap={location.pathname === "/"}
        loading={authService().store.loading}
        disabled={settignsForm.invalid}
        onClose={(done) => {
          if (done) {
            onUpdateSettings();
          } else {
            if (user()?.defaultFrom && user()?.defaultTo) {
              setSettingsOpen(false);
              reset(settignsForm);
            }
          }
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography color="text.primary" variant="h6" component="h2" mb={1}>
            {translation.t("settings.title")}
          </Typography>
          <Show when={!user()?.defaultFrom && !user()?.defaultTo}>
            <Typography
              color="text.primary"
              variant="subtitle1"
              component="h2"
              mb={1}
            >
              {translation.t("settings.subTitle")}
            </Typography>
          </Show>
          <DoubleSelect
            form={settignsForm}
            firstName="defaultFrom"
            firstLabel={translation.t(
              "addEditDictionary.basic.form.from.label"
            )}
            secondName="defaultTo"
            secondLabel={translation.t("addEditDictionary.basic.form.to.label")}
            equals={translation.t("addEditDictionary.basic.form.to.existError")}
            options={languageOptions}
            required={translation.t(
              "addEditDictionary.basic.form.from.emptyError"
            )}
          />
        </Box>
      </BaseModal>
    </Box>
  );
};
