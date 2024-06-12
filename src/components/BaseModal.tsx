import { Box, Button, Drawer, Stack, useTheme } from "@suid/material";
import { useMainButton } from "../hooks";
import { ParentComponent, Show, createEffect, createMemo, on } from "solid-js";
import Lottie from "./Lottie";
import duckLoading from "../assets/lottie/duck_loading.json";

export type ModalProps = {
  open: boolean;
  onClose?: (done: boolean) => void;
  overlap?: boolean;
  loading?: boolean;
  disabled?: boolean;
  acceptText?: string;
  declineText?: string;
  type?: "base" | "danger";
};

export const BaseModal: ParentComponent<ModalProps> = (props) => {
  const mainButton = useMainButton();
  const theme = useTheme();

  createEffect(
    on(
      createMemo(() => props.open),
      (open) => {
        if (!props.overlap) {
          if (open && mainButton().isVisible) {
            mainButton().hide();
          }
          if (!open && !mainButton().isVisible) {
            mainButton().show();
          }
        }
      }
    )
  );

  const onHandleClose = () => {
    if (props.onClose) {
      props.onClose(false);
    }
  };

  const onHandleDoneClose = () => {
    if (props.onClose) {
      props.onClose(true);
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={props.open}
      PaperProps={{
        sx: {
          padding: 2,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          bgcolor: theme.palette.background.default,
          borderTopRightRadius: 4,
          borderTopLeftRadius: 4,
        },
      }}
      onClose={() => onHandleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Show
          when={!props.loading}
          fallback={
            <Lottie
              animationData={duckLoading}
              loop={true}
              autoplay={true}
              width={"150px"}
              height={"150px"}
            ></Lottie>
          }
        >
          {props.children}
        </Show>
      </Box>
      <Stack direction="row" gap={1} mt={2}>
        <Show when={props.acceptText}>
          <Button
            variant="contained"
            color={props.type === "danger" ? "error" : "primary"}
            fullWidth={true}
            disabled={props.disabled || props.loading}
            onClick={onHandleDoneClose}
          >
            {props.acceptText}
          </Button>
        </Show>
        <Show when={props.declineText}>
          <Button
            variant="contained"
            color="error"
            fullWidth={true}
            disabled={props.disabled || props.loading}
            onClick={onHandleClose}
          >
            {props.declineText}
          </Button>
        </Show>
      </Stack>
    </Drawer>
  );
};
