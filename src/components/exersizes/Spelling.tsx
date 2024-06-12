import { Paper, Typography, styled } from "@suid/material";
import { Word } from "../../models";
import { Component } from "solid-js";
import { StepInput } from "../StepInput";

type SpellingProps = {
  word: Word;
  onChange: (result: boolean) => void;
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.h5,
  padding: theme.spacing(1),
  textAlign: "center",
}));
export const Spelling: Component<SpellingProps> = (props) => {
  const onChangeHandler = (value: string) => {
    props.onChange(props.word.from.toLowerCase() === value.toLowerCase());
  };
  return (
    <>
      <Item>
        <Typography color="text.primary">
          {props.word.to.split(";").join("\n")}
        </Typography>
      </Item>
      <StepInput
        length={props.word.from.split(/\s+/).map((item) => item.length)}
        onChange={onChangeHandler}
      ></StepInput>
    </>
  );
};
