import { Component } from "solid-js";
// import { useParams } from "@solidjs/router";
// import { DictionaryService, ImagesService } from "../../services";
// import styles from "./Association.module.css";

const Association: Component = () => {
  // const params = useParams<{ id: string }>();
  // const id = params.id;
  // const [dictionary] = createResource(id, DictionaryService.getById);
  // const navigator = useNavigator();
  // const associations: Map<number, string> = new Map();

  // const onSlideChange = (slideData: any, id: number) => {
  //   associations.set(id, slideData.urls.small);
  // };

  // const onFinish = async () => {
  //   await DictionaryService.addAssociations({
  //     id: +id,
  //     associations: [...associations].map(([id, data]) => ({ id, data })),
  //   });
  //   navigator?.back();
  // };

  // const buttonText = (index: number) => {
  //   const dict = dictionary()?.units;
  //   if (dict?.length) {
  //     return index === dict.length - 1 ? "Finish" : "Continue";
  //   }
  //   return "Finish";
  // };

  // return (
  //   <section class={styles.association}>
  //     <Show when={!dictionary.loading} fallback={<Spinner />}>
  //       <Wizard onFinish={onFinish}>
  //         <For each={dictionary()?.units}>
  //           {(item, index) => {
  //             console.log(item);
  //             const [images] = createResource(
  //               item.phrase.origin,
  //               ImagesService.getImages
  //             );
  //             return (
  //               <Step
  //                 buttonTitle={buttonText(index())}
  //                 title={item.phrase.origin}
  //               >
  //                 <Slider
  //                   items={images()}
  //                   effect="cards"
  //                   grab={true}
  //                   onChange={(slideData) => onSlideChange(slideData, item.id)}
  //                 >
  //                   {(item) => (
  //                     <img
  //                       class={styles.image}
  //                       src={item.urls.small}
  //                       alt={item.description}
  //                     />
  //                   )}
  //                 </Slider>
  //               </Step>
  //             );
  //           }}
  //         </For>
  //       </Wizard>
  //     </Show>
  //   </section>
  // );
  return <div></div>;
};

export default Association;
