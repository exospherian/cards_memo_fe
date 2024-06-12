import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Theme,
  Typography,
} from "@suid/material";
import { ArrowDropDown } from "@suid/icons-material";
import { SxProps } from "@suid/system";
import { For, JSX, Show, createEffect, createSignal } from "solid-js";
import { useMainButton } from "../hooks";
import { useLaunchParams } from "@tma.js/sdk-solid";

type MultipleInputFieldProps = {
  label: string;
  options: string[];
  onChange: (value: string) => void;
  onBlur: JSX.EventHandler<HTMLTextAreaElement | HTMLInputElement, FocusEvent>;
  value?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  loading?: boolean;
};

export const MultipleInputField = (props: MultipleInputFieldProps) => {
  const mainButton = useMainButton();
  const [menuWidth, setMenuWidth] = createSignal<string>();
  const [anchorEl, setAnchorEl] = createSignal<HTMLDivElement>();
  const [value, setValue] = createSignal("");
  const launchParams = useLaunchParams();
  const [open, setOpen] = createSignal(false);
  const [selectedOptions, setSelectedOptions] = createSignal<string[]>([]);

  createEffect(() => {
    const values = props.value?.split(";").filter(Boolean);
    if (values?.length) {
      setSelectedOptions(values);
    }
  });

  createEffect(() => {
    props.onChange(selectedOptions().join(";"));
  });

  const onSelectOption = (value: string) => {
    if (selectedOptions().includes(value)) {
      setSelectedOptions((prev) => prev.filter((val) => val !== value));
    } else {
      setSelectedOptions((prev) => [...prev, value]);
    }
  };

  const onDelete = (item: string) => {
    setSelectedOptions((prev) => prev.filter((val) => val !== item));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getWidth = () => {
    return anchorEl()?.getBoundingClientRect().width + "px";
  };

  const handleChange = () => {
    if (value()) {
      if (!selectedOptions().includes(value())) {
        setSelectedOptions((prev) => [...prev, value().trim()]);
      }
      setValue("");
    }
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      sx={{
        ...props.sx,
        "& .MuiInputBase-root": {
          flexWrap: "wrap",
          gap: "5px 3px",
          paddingTop: 1,
          paddingBottom: 1,
        },
        "& .MuiInputBase-input": {
          minWidth: "150px",
          maxWidth: "calc(100% - 27px)",
          padding: 0,
        },
      }}
      autoFocus={false}
      autoComplete="off"
      onBlur={(e) => {
        props.onBlur(e);
        handleChange();
        if (["android", "ios"].includes(launchParams.platform)) {
          requestAnimationFrame(() => {
            mainButton().show();
          });
        }
      }}
      label={props.label}
      error={!!props.error}
      helperText={props.error}
      value={value()}
      required={props.required}
      disabled={props.disabled}
      onFocus={() => {
        if (["android", "ios"].includes(launchParams.platform)) {
          requestAnimationFrame(() => {
            mainButton().hide();
          });
        }
      }}
      inputProps={{
        enterkeyhint: "done",
      }}
      onChange={(e) => setValue(e.target.value)}
      onKeyUp={(event) => {
        if (event.key === "Enter") {
          handleChange();
        }
      }}
      InputProps={{
        ref: (e) => setAnchorEl(e),
        startAdornment: (
          <For each={selectedOptions()}>
            {(item) => {
              return (
                <Chip
                  label={item}
                  size="small"
                  variant="outlined"
                  onDelete={() => onDelete(item)}
                ></Chip>
              );
            }}
          </For>
        ),
        endAdornment: (
          <Box
            sx={{
              width: "23px",
              height: "23px",
              position: "relative",
              "& .MuiButtonBase-root": {
                padding: 0,
              },
            }}
          >
            <Show
              when={!props.loading}
              fallback={
                <CircularProgress
                  sx={{ height: "100%", width: "100%" }}
                  color="primary"
                />
              }
            >
              <IconButton
                aria-label="more"
                id="long-button"
                sx={{ height: "100%", width: "100%" }}
                aria-controls={open() ? "long-menu" : undefined}
                aria-expanded={open() ? "true" : undefined}
                aria-haspopup="true"
                onClick={() => {
                  setMenuWidth(getWidth());
                  setOpen(!open());
                }}
              >
                <ArrowDropDown />
              </IconButton>
            </Show>

            <Menu
              id="long-menu"
              MenuListProps={{ "aria-labelledby": "long-button" }}
              anchorEl={anchorEl()}
              open={open()}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  maxHeight: `150px`,
                  width: menuWidth(),
                },
              }}
            >
              <Show when={!props.options.length}>
                <MenuItem>Empty</MenuItem>
              </Show>
              {props.options.map((option) => (
                <MenuItem
                  selected={selectedOptions().includes(option)}
                  onClick={() => onSelectOption(option)}
                >
                  <Typography variant="inherit" noWrap>
                    {option}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ),
      }}
    ></TextField>
  );
};
