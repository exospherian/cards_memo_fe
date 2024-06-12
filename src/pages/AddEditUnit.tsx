// import { useNavigate } from "@solidjs/router";
// import { Language, UnitForm } from "../../models";
// import { Component, createSignal, onMount } from "solid-js";
// import { createForm, required, submit } from "@modular-forms/solid";

// import styles from "./AddEditUnit.module.css";
// import { useTranslation } from "../../providers";

// export const AddEditUnit: Component = () => {
//   // const location = useLocation<Unit>();
//   const navigate = useNavigate();
//   // const [form, { Form, Field }] = createForm<UnitForm>({
//   //   validateOn: "touched",
//   // });
//   const translation = useTranslation();
//   const [_, setConfig] = createSignal<{
//     text: string;
//     onClick: VoidFunction;
//   }>();

//   // onMount(() => {
//   //   setConfig({
//   //     text: "Update unit",
//   //     onClick: () => submit(form),
//   //   });
//   // });
//   const languageOptions = [
//     { label: "English", value: Language.en },
//     { label: "Russian", value: Language.ru },
//   ];

//   const onSubmit = (data: UnitForm) => {
//     navigate("/", { replace: true, state: data });
//   };

//   return (
//     <section class={styles.addEditUnit}>
//       {/* <Form onSubmit={onSubmit}>
//         <article style={{ "margin-top": 0 }}>
//           <Field
//             name={`phrase.origin`}
//             validate={[required("Phrase is required")]}
//           >
//             {(field, props) => (
//               <Input
//                 {...props}
//                 value={field.value}
//                 error={field.error}
//                 touched={field.touched}
//                 type="text"
//                 label="Phrase"
//                 placeholder="Write word or phrase"
//                 required
//               />
//             )}
//           </Field>
//           <Field
//             name={`phrase.lang`}
//             validate={[required("Phrase language is required")]}
//           >
//             {(field, props) => (
//               <Select
//                 {...props}
//                 value={field.value}
//                 options={languageOptions}
//                 error={field.error}
//                 label="language"
//                 placeholder="Select language"
//                 required
//               />
//             )}
//           </Field>
//           <Field
//             name={`translation`}
//             validate={[required("Please enter translation.")]}
//           >
//             {(field, props) => (
//               <Input
//                 {...props}
//                 value={field.value}
//                 error={field.error}
//                 touched={field.touched}
//                 type="text"
//                 label="Translation"
//                 placeholder="Write translation"
//                 required
//               />
//             )}
//           </Field>
//           <Field
//             name={`translationLang`}
//             validate={[required("Please select language.")]}
//           >
//             {(field, props) => (
//               <Select
//                 {...props}
//                 value={field.value}
//                 options={languageOptions}
//                 error={field.error}
//                 label="Translation language"
//                 placeholder="Select language"
//                 required
//               />
//             )}
//           </Field>
//           <Details title={translation.t("addEditDictionary.words.details")}>
//             <Field name={`transcription`}>
//               {(field, props) => (
//                 <Input
//                   {...props}
//                   value={field.value}
//                   error={field.error}
//                   touched={field.touched}
//                   type="text"
//                   label="Transcription"
//                   placeholder="Write transcription"
//                 />
//               )}
//             </Field>
//             <Field name={`description`}>
//               {(field, props) => (
//                 <TextArea
//                   {...props}
//                   value={field.value}
//                   error={field.error}
//                   touched={field.touched}
//                   label="Description"
//                   placeholder="Write description"
//                 />
//               )}
//             </Field>
//             <Field name={`tags`}>
//               {(field, props) => (
//                 <Input
//                   {...props}
//                   value={field.value}
//                   error={field.error}
//                   touched={field.touched}
//                   type="text"
//                   label="Tags"
//                   placeholder="Write tags"
//                 />
//               )}
//             </Field>
//           </Details>
//         </article>
//       </Form> */}
//       {/* <MainButton config={config()} /> */}
//     </section>
//   );
// };

// export default AddEditUnit;
