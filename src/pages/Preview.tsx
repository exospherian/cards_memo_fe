// import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
// import { Article, List, Step, Wizard } from "../../components";
// import { useTranslation } from "../../providers";
// import { useTranslator } from "../../hooks";

const Preview: Component = () => {
  // const navigate = useNavigate();
  // const translation = useTranslation();

  // const onFinish = () => {
  //   navigate("/general", { replace: true });
  // };

  return (
    <section class="about">
      {/* <Wizard onFinish={onFinish}>
        <Step title={translation.t("about.firstStep.title")}>
          <p>{translation.t("about.firstStep.content")}</p>
        </Step>
        <Step title={translation.t("about.secondStep.title")}>
          <List
            fallback={<p>No tutorial</p>}
            component={Article}
            items={translation.t("about.secondStep.content")}
          />
        </Step>
        <Step title={translation.t("about.finalStep.title")}>
          <p>{translation.t("about.finalStep.content")}</p>
        </Step>
      </Wizard> */}
    </section>
  );
};

export default Preview;
