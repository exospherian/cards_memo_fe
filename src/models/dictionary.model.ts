import { CreatedWordForm, UpdatedWordForm, Word } from "./words.model";

export enum DictionaryType {
  PUBLIC = "public",
  GLOBAL = "global",
  PRIVATE = "private",
}

export const enum DictionaryAction {
  DELETE = "delete",
  UPDATE = "update",
  PUBLISH = "publish",
  STUDY = "study",
  SHARE = "share",
  ADD = "add",
}

export const dictionaryActionsByType = {
  [DictionaryType.PRIVATE]: {
    main: DictionaryAction.UPDATE,
    sub: [
      DictionaryAction.DELETE,
      DictionaryAction.PUBLISH,
      DictionaryAction.SHARE,
      DictionaryAction.STUDY,
    ],
  },
  [DictionaryType.PUBLIC]: {
    main: DictionaryAction.UPDATE,
    sub: [DictionaryAction.DELETE, DictionaryAction.STUDY],
  },
  [DictionaryType.GLOBAL]: {
    main: DictionaryAction.ADD,
    sub: [],
  },
};

export type Dictionary = {
  id: string;
  name: string;
  from: string;
  to: string;
  created: string;
  updateExist: boolean;
  updated?: string;
  dictionaryId?: string;
  childPublicDictionaryId?: string;
  lastPublishTime?: string;
  publicDictionaryId?: string;
  description?: string;
  countOfDownload?: number;
  tags?: number[];
};

export type DictionaryWithWords = Dictionary & {
  words: Word[];
};

export type DictionaryForm = {
  general: Omit<Dictionary, "created" | "id" | "words">;
  updatedWords: UpdatedWordForm;
  createdWords: CreatedWordForm;
};

export type DictionaryCreateDto = Omit<Dictionary, "created" | "id"> & {
  words: CreatedWordForm;
};

export type DictionaryUpdateDto = Partial<
  Omit<Dictionary, "created" | "id">
> & {
  delete?: string[];
  words?: CreatedWordForm;
  updateWords?: UpdatedWordForm;
};

export type DictionaryFilter = {
  tags?: number[];
  from: string;
  to: string;
  limit: number;
  offset: number;
};
