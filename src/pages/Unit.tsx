// import { useNavigate, useParams } from "@solidjs/router";
// import { Component, Show, Suspense, createResource } from "solid-js";
// import { UnitService } from "../../services";
// import { HiOutlinePhoto } from "solid-icons/hi";
// import { Loader } from "../../components";
// import styles from "./Unit.module.css";

// const Unit: Component = () => {
//   const navigate = useNavigate();
//   const params = useParams<{ id: string }>();
//   const id = params.id;
//   const [unit] = createResource(id, UnitService.getById);
//   const colorList = [
//     "red",
//     "orange",
//     "yellow",
//     "green",
//     "blue",
//     "indigo",
//     "violet",
//   ];

//   const getLevelColor = () => colorList[unit()?.progresses[0]?.level || 0];

//   return (
//     <section class={styles.unit}>
//       {/* <Suspense fallback={<Loader></Loader>}>
//         <Show when={unit()}>
//           <header class={styles.header}>
//             <h1>{unit()?.phrase.origin}</h1>
//             <span style={{ color: getLevelColor() }}>
//               {unit()?.progresses[0]?.level || 0}
//             </span>
//           </header>
//           <section class={styles.association}>
//             <Show
//               when={unit()?.associations[0]?.file}
//               fallback={
//                 <div class="item-no-image">
//                   <HiOutlinePhoto size={64} />
//                   <p>No Recall Image found</p>
//                 </div>
//               }
//             >
//               <img src={unit()?.associations[0]?.file} />
//             </Show>
//           </section>
//           <Details title="Description">
//             <article>
//               <div>
//                 <p>{unit()?.description || "no description yet"}</p>
//               </div>
//             </article>
//             <ul>
//               <p>transcription: {unit()?.transcription || "---"}</p>
//               <p>tags: {unit()?.tags || "no tags"}</p>
//               <p>
//                 Previous repeat: {unit()?.progresses[0]?.previousRepeatDate}
//               </p>
//             </ul>
//           </Details>
//           <MainButton
//             text={"Edit Unit"}
//             onClick={() => navigate(`/unit/edit`)}
//           />
//         </Show>
//       </Suspense> */}
//     </section>
//   );
// };

// export default Unit;
// {
//   /* <Card sx={{ display: "flex" }}>
//           <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
//             <CardContent sx={{ flex: "1 0 auto" }}>
//               <Typography component="div" variant="h5">
//                 {dictionary?.name}
//               </Typography>
//               <Typography
//                 variant="subtitle1"
//                 color="text.secondary"
//                 component="div"
//               >
//                 {dictionary?.from}
//               </Typography>
//               <Typography
//                 variant="subtitle2"
//                 color="text.secondary"
//                 component="div"
//               >
//                 {dateTransform(dictionary?.created)}
//               </Typography>
//             </CardContent>
//           </Box>
//           <CardMedia
//             component="img"
//             sx={{ width: 151 }}
//             image="https://mui.com/static/images/cards/live-from-space.jpg"
//             alt="Live from space album cover"
//           />
//         </Card> */
// }
