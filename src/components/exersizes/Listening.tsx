import { IconButton } from "@suid/material";
import { Word } from "../../models";
import { Component, createResource } from "solid-js";
import { StepInput } from "../StepInput";
import { RecordVoiceOverOutlined } from "@suid/icons-material";
import { AuthService, SoundService } from "../../services";
import { useService } from "solid-services";

type ListeningProps = {
  word: Word;
  onChange: (result: boolean) => void;
};

export const Listening: Component<ListeningProps> = (props) => {
  const soundService = useService(SoundService)();
  const authService = useService(AuthService)();
  const [speach] = createResource(
    () => ({
      from: authService.store.user?.defaultFrom ?? "en",
      text: props.word.from,
    }),
    soundService.getSound
  );

  const onChangeHandler = (value: string) => {
    props.onChange(props.word.from.toLowerCase() === value.toLowerCase());
  };

  return (
    <>
      <StepInput
        length={props.word.from.split(/\s+/).map((item) => item.length)}
        onChange={onChangeHandler}
      />
      <IconButton
        onClick={() => {
          new Audio(speach()).play();
        }}
        size="large"
        sx={{ flex: 1, borderRadius: 1 }}
      >
        <RecordVoiceOverOutlined sx={{ fontSize: "50px" }} />
      </IconButton>
    </>
  );
};
