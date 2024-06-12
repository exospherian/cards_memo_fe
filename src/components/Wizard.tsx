import {
  Component,
  JSX,
  ParentComponent,
  Show,
  children,
  createSignal,
} from "solid-js";
import { BackButton } from "./BackButton";
import { MainButton } from "./MainButton";
import {
  Backdrop,
  Box,
  LinearProgress,
  Typography,
  useTheme,
} from "@suid/material";
import { useNavigator } from "../providers";
import { BaseWrapper } from "./BaseWrapper";

interface StepProps {
  title?: string;
  children: JSX.Element;
  onNext: () => boolean | Promise<boolean>;
  buttonTitle: string;
}

interface WizardProps {
  backButtonAttach?: boolean;
}

export const Step: Component<StepProps> = (props) => {
  return props as unknown as JSX.Element;
};

export const Wizard: ParentComponent<WizardProps> = (props) => {
  const steps = children(() =>
    Array.isArray(props.children) ? props.children : [props.children]
  ) as unknown as () => StepProps[];
  const [stepIdx, setStepIdx] = createSignal<number>(0);
  const [isLoading, setIsLoading] = createSignal(false);
  const theme = useTheme();
  const navigator = useNavigator();
  const nextStep = async () => {
    const step = steps()[stepIdx()];
    if (!step) return;
    setIsLoading(true);
    const currentValidation = await step.onNext();
    setIsLoading(false);
    if (currentValidation && stepIdx() < steps().length - 1) {
      setStepIdx(stepIdx() + 1);
    }
  };

  const prevStep = () => {
    const step = steps()[stepIdx()];
    if (!step) return;
    setStepIdx(stepIdx() - 1);
  };

  const renderStepContent = () => {
    return steps()[stepIdx()]?.children;
  };

  const title = () => {
    return steps()[stepIdx()]?.title;
  };

  const backButtonClick = () => {
    const backCb = navigator?.back ?? function () {};
    const idx = stepIdx();
    const isAtFirstStep = idx === 0;
    return isAtFirstStep ? backCb : prevStep;
  };

  const text = () => {
    return steps()[stepIdx()]!.buttonTitle;
  };

  const progress = () => {
    return stepIdx() === steps().length - 1
      ? 100
      : (stepIdx() / (steps().length - 1)) * 100;
  };

  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
        open={isLoading()}
      />
      <Show when={!props.backButtonAttach}>
        <BackButton onClick={backButtonClick()} />
      </Show>
      <LinearProgress variant="determinate" value={progress()} />
      <BaseWrapper>
        <Typography variant="h4" color="text.primary">
          {title()}
        </Typography>
        {renderStepContent() as unknown as JSX.Element}
      </BaseWrapper>
      <MainButton
        loading={isLoading()}
        text={text()}
        onClick={() => nextStep()}
      />
    </Box>
  );
};
