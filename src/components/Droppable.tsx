import { createDroppable } from "@thisbeyond/solid-dnd";
import { JSXElement } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface DirectiveFunctions {
      droppable: any;
    }
  }
}

export function Droppable<T extends Record<string, any>>(props: {
  data?: T;
  id: string;
  children: JSXElement;
}) {
  const droppable = createDroppable(props.id, props.data);
  return (
    <div
      use:droppable
      class="droppable"
      style={{ "touch-action": "none" }}
      classList={{ "!droppable-accept": droppable.isActiveDroppable }}
    >
      {props.children}
    </div>
  );
}
