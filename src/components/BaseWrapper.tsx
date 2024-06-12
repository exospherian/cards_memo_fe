import { Container, Theme, useTheme } from "@suid/material";
import { SxProps } from "@suid/system";
import { ParentComponent, onMount } from "solid-js";

export type BaseWrapperProps = {
  sx?: SxProps<Theme>;
};

export const BaseWrapper: ParentComponent<BaseWrapperProps> = (props) => {
  const theme = useTheme();

  onMount(() => {
    window.scrollBy({ top: 1 });
  });

  return (
    <Container
      sx={{
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        flexGrow: 1,
        flexBasis: 0,
        boxSizing: "border-box",
        gap: 1,
        ...props.sx,
      }}
    >
      {props.children}
    </Container>
  );
};
