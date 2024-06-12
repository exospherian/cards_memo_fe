import { Paper, styled } from "@suid/material";
import { Component } from "solid-js";

export type ClueProps = {
  text: string;
};

const Container = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

export const Clue: Component<ClueProps> = (props) => {
  return <Container>{props.text}</Container>;
};
