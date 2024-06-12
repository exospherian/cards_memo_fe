import { createStore } from "solid-js/store";
import { END_POINT } from "../const/api.const";
import { useService } from "solid-services";
import { AuthService } from "./auth.service";
import { Word } from "models";
// import { ToastService } from "./toast.service";

export const enum EXERSIZE {
  FLASH_CARD = "flashcard",
  LISTENING = "listening",
  MATCHING = "matching",
  SPELLING = "spelling",
}

type StudyStore = {
  loading: boolean;
  words: Word[];
  wordIdx: number;
  chunkIdx: number;
  error?: string;
  progresses: Map<string, Partial<Record<EXERSIZE, boolean>>>;
};

const enum ROUTES {
  BASE = "/study/global",
  UPDATE = "/study/global/progress",
}

export const COMPLEX_EXERSIZES = [EXERSIZE.MATCHING];

export const BASE_EXERSIZES = [EXERSIZE.LISTENING, EXERSIZE.SPELLING];

export const StudyService = () => {
  const path = `${END_POINT}${ROUTES.BASE}`;
  const chunkSize = 5;
  const authService = useService(AuthService)();
  // const toastService = useService(ToastService)();
  const [store, setStore] = createStore<StudyStore>({
    loading: false,
    words: [],
    wordIdx: 0,
    chunkIdx: 0,
    progresses: new Map(),
  });

  const word = () => store.words[store.wordIdx];

  const chunk = () => {
    return store.words.slice(
      store.chunkIdx * chunkSize,
      store.chunkIdx * chunkSize + chunkSize
    );
  };

  const initInternal = (words: Word[]) => {
    setStore({
      words,
    });
  };

  const cleanProgress = () => {
    setStore({
      loading: false,
      words: [],
      wordIdx: 0,
      chunkIdx: 0,
      progresses: new Map(),
    });
  };

  const findAll = async (): Promise<void> => {
    setStore({ loading: true });
    try {
      const resp = await authService.axiosJWT.get<Word[]>(path, {
        params: {
          from: authService.store.user?.defaultFrom,
          to: authService.store.user?.defaultTo,
        },
      });
      const words = resp.data.sort(
        (a, b) => b.globalProgress - a.globalProgress
      );

      setStore({
        words: words,
      });
    } catch (error) {
      // toastService.showError(error);
    } finally {
      setStore({ loading: false });
    }
  };

  const updateProgress = async (): Promise<void> => {
    try {
      const payload: { up: string[]; down: string[] } = {
        up: [],
        down: [],
      };
      store.progresses.forEach((value, key) => {
        const completedNumber = Object.values(value).filter(Boolean).length;
        if (completedNumber >= 3) {
          payload.up.push(key);
        }
        if (completedNumber < 2) {
          payload.down.push(key);
        }
      });
      if (payload.down.length || payload.up.length) {
        await authService.axiosJWT.post<void>(
          `${END_POINT}${ROUTES.UPDATE}`,
          payload
        );
      }
    } finally {
      cleanProgress();
    }
  };

  const nextWord = () => {
    setStore((store) => {
      return {
        wordIdx: store.wordIdx + 1,
      };
    });
  };

  const completeBaseExersizes = () => {
    setStore((store) => {
      store.progresses.set(word().id, {
        [EXERSIZE.LISTENING]: true,
        [EXERSIZE.SPELLING]: true,
      });
      return {
        progresses: new Map(store.progresses),
      };
    });
  };

  const completeBaseExersize = (exersize: EXERSIZE, result: boolean) => {
    const wordId = word().id;
    if (wordId) {
      setStore((store) => {
        const progress = store.progresses.get(wordId);
        store.progresses.set(wordId, {
          ...progress,
          [exersize]: result,
        });
        return {
          progresses: new Map(store.progresses),
        };
      });
    }
  };

  const completeComplexExersize = (
    exersize: EXERSIZE,
    result: Map<string, boolean>
  ) => {
    setStore((store) => {
      result.forEach((value, key) => {
        const progress = store.progresses.get(key);
        if (progress) {
          store.progresses.set(key, {
            ...progress,
            [exersize]: value,
          });
        }
      });
      return {
        progresses: new Map(store.progresses),
        chunkIdx: store.chunkIdx + 1,
      };
    });
  };

  const getAvailableBaseExersizes = () => {
    const progress = store.progresses.get(word().id);
    if (progress) {
      const insideExersizes = Object.entries(progress).map(
        ([key]) => key as EXERSIZE
      );
      return BASE_EXERSIZES.filter(
        (exersize) => !insideExersizes.includes(exersize)
      );
    } else {
      return BASE_EXERSIZES;
    }
  };

  const isComplexExersize = (exersize: EXERSIZE) => {
    return COMPLEX_EXERSIZES.includes(exersize);
  };

  const isLastWordInChunk = () => {
    return !((store.wordIdx + 1) % 5);
  };

  const isLastWord = () => {
    return store.wordIdx === store.words.length - 1;
  };

  return {
    store,
    chunk,
    word,
    initInternal,
    cleanProgress,
    completeBaseExersizes,
    completeBaseExersize,
    completeComplexExersize,
    getAvailableBaseExersizes,
    nextWord,
    isComplexExersize,
    isLastWordInChunk,
    isLastWord,
    findAll,
    updateProgress,
  };
};
