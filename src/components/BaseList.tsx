import { For, Show, createSignal } from "solid-js";
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@suid/material";
import { ExpandLess, ExpandMore } from "@suid/icons-material";

export type ListProps<T extends any[]> = {
  items: T;
  mainField: keyof T[number];
  onClick?: (item: T[number]) => void;
  expandedFields?: {
    key: keyof T[number];
    label: string;
  }[];
  emptyText: string;
};

export function BaseList<T extends any[]>(props: ListProps<T>) {
  const theme = useTheme();
  const [expendedItemIndex, setExpendedItemIndex] = createSignal();

  const onClick = (item: T[number], index: number) => {
    if (props.onClick) {
      return props.onClick(item);
    }
    if (props.expandedFields) {
      setExpendedItemIndex(expendedItemIndex() === index ? null : index);
    }
  };

  return (
    <Card sx={{ display: "flex", overflow: "unset" }}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
        }}
        component="nav"
        aria-label="dictionaries"
        disablePadding
      >
        <For
          each={props.items}
          fallback={
            <ListItem alignItems="center">
              <ListItemText
                primaryTypographyProps={{
                  color: theme.palette.text.primary,
                }}
                primary={props.emptyText}
              />
            </ListItem>
          }
        >
          {(item, index) => (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => onClick(item, index())}>
                  <ListItemText primary={item[props.mainField]} />
                  <Show when={!!props.expandedFields}>
                    {index() === expendedItemIndex() ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </Show>
                </ListItemButton>
              </ListItem>
              <Show
                when={index() === expendedItemIndex() && !!props.expandedFields}
              >
                <List disablePadding component="div">
                  <For each={props.expandedFields}>
                    {(field) =>
                      item[field.key] ? (
                        <ListItem sx={{ flexWrap: "wrap" }}>
                          <ListItemText secondary={`${field.label}: `} />
                          <ListItemText primary={item[field.key]} />
                        </ListItem>
                      ) : null
                    }
                  </For>
                </List>
              </Show>
              <Show when={index() !== props.items.length - 1}>
                <Divider />
              </Show>
            </>
          )}
        </For>
      </List>
    </Card>
  );
}
