import { createDraggable } from "@thisbeyond/solid-dnd";
import { JSXElement } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface DirectiveFunctions {
      draggable: any;
    }
  }
}

export function Draggable<T extends Record<string, any>>(props: {
  data?: T;
  id: string;
  children: JSXElement;
}) {
  const draggable = createDraggable(props.id, props.data);
  return (
    <div
      use:draggable
      class="draggable"
      style={{ "touch-action": "none" }}
      classList={{ "opacity-25": draggable.isActiveDraggable }}
    >
      {props.children}
    </div>
  );
}
