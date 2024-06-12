import { Box, Paper, styled } from "@suid/material";
import { Word } from "../../models";
import { Component, createEffect, createSignal, on } from "solid-js";
import { useTranslation } from "../../providers";

type FlashcardProps = {
  word: Word;
};
const Clue = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));
const Card = styled(Paper)(({ theme }) => ({
  ...theme.typography.h5,
  height: "100%",
  width: "100%",
  backfaceVisibility: "hidden",
  position: "absolute",
  display: "flex",
  textWrap: "balance",
  padding: theme.spacing(1),
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  color: theme.palette.text.primary,
}));

export const Flashcard: Component<FlashcardProps> = (props) => {
  const translation = useTranslation();
  const [transition, setTransition] = createSignal(false);
  const [isFipped, setIsFlipped] = createSignal(false);

  createEffect(
    on(
      () => props.word,
      () => {
        setTransition(false);
        setIsFlipped(false);
      }
    )
  );

  return (
    <>
      <Clue>{translation.t("study.flashCard.clue")}</Clue>
      <Box
        sx={{
          position: "relative",
          flex: 1,
          transition: transition() ? "transform 1s" : "none",
          transformStyle: "preserve-3d",
          cursor: "pointer",
          transform: isFipped() ? "rotateY(180deg)" : "none",
        }}
        onClick={() => {
          setTransition(true);
          setIsFlipped(!isFipped());
        }}
      >
        <Card>{props.word.from}</Card>
        <Card sx={{ transform: "rotateY( 180deg )" }}>
          {props.word.to.replace(";", ", ")}
        </Card>
      </Box>
    </>
  );
};
