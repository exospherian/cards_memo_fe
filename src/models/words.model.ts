export type Word = {
  id: string;
  from: string;
  to: string;
  order: number;
  created: string;
  transcription?: string;
  globalProgress: number;
  localProgress: number;
  description?: string;
};

export type CreatedWordForm = Omit<
  Word,
  "created" | "id" | "globalProgress" | "localProgress"
>[];

export type UpdatedWordForm = Omit<
  Word,
  "created" | "order" | "globalProgress" | "localProgress"
>[];
