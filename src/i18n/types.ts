import { Flatten } from "@solid-primitives/i18n";

export type Dict = {
  general: {
    sections: {
      dictionaries: string;
      publicDictionaries: string;
      memorize: string;
      progress: string;
      contacts: string;
    };
  };
  dictionaries: {
    title: string;
    button: string;
    notFound: string;
    tab: {
      private: string;
      public: string;
      global: string;
    };
  };
  addEditDictionary: {
    basic: {
      title: string;
      button: string;
      form: {
        name: {
          label: string;
          emptyError: string;
          existError: string;
        };
        from: {
          label: string;
          emptyError: string;
          existError: string;
        };
        to: {
          label: string;
          emptyError: string;
          existError: string;
        };
        description: string;
      };
    };
    words: {
      title: string;
      button: {
        add: string;
        edit: string;
      };
      form: {
        from: {
          label: string;
          error: string;
        };
        to: {
          label: string;
          error: string;
        };
        transcription: string;
        description: string;
        deleteButton: string;
        addButton: string;
      };
    };
  };
  publicDictionaries: {
    notFound: string;
    filter: {
      title: string;
      button: string;
      acceptText: string;
    };
    button: string;
  };
  dictionary: {
    notFound: string;
    buttons: {
      edit: string;
      add: string;
    };
    language: (template: { from: string; to: string }) => string;
    downloadCount: (template: { count: number }) => string;
    created: (template: { created: string }) => string;
    description: string;
    published: string;
    word: {
      desctiption: string;
      translation: string;
      transcription: string;
    };
    share: {
      title: string;
    };
    modal: {
      delete: {
        acceptText: string;
        title: string;
        subTitle: string;
      };
      publish: {
        acceptText: string;
        title: string;
        subTitle: string;
      };
      add: {
        acceptText: string;
        title: string;
        subTitle: string;
      };
    };
  };
  tags: {
    label: string;
    required: string;
  };
  study: {
    empty: {
      title: string;
      subTitle: string;
      button: {
        public: string;
        private: string;
      };
    };
    button: string;
    flashCard: {
      clue: string;
      apply: string;
      reject: string;
    };
    matching: {
      clue: string;
      place: string;
    };
  };
  settings: {
    button: string;
    title: string;
    subTitle: string;
  };
};

export type Locale = "en" | "ru";

export type Dictionary = Flatten<Dict>;
