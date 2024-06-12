export const dict = {
  general: {
    sections: {
      dictionaries: "Dictionaries",
      publicDictionaries: "Public dictionaries",
      memorize: "Memorize",
      progress: "Progress",
      contacts: "Contacts",
    },
  },
  dictionaries: {
    title: "Dictionaries",
    button: "Create dictionary",
    notFound: "Dictionaries not found",
    tab: {
      private: "Private",
      public: "Public",
      global: "Global",
    },
  },
  publicDictionaries: {
    notFound: "Public dictionaries not found",
    filter: {
      title: "Filters",
      button: "Filter",
      acceptText: "Apply",
    },
    button: "Add to yours",
  },
  addEditDictionary: {
    basic: {
      title: "New dictionary",
      button: "Next",
      form: {
        name: {
          label: "Name",
          emptyError: "Please enter a name",
          existError: "Name already exists",
        },
        from: {
          label: "Base language",
          emptyError: "Please select a language",
          existError: "Language must be unique",
        },
        to: {
          label: "Translation language",
          emptyError: "Please select a language",
          existError: "Language must be unique",
        },
        description: "Description",
      },
    },
    words: {
      title: "Phrases",
      button: {
        add: "Create",
        edit: "Update",
      },
      form: {
        from: {
          label: "Phrase",
          error: "Please enter a phrase",
        },
        to: {
          label: "Translation",
          error: "Please enter a translation",
        },
        transcription: "Transcription",
        description: "Description",
        addButton: "Add phrase",
        deleteButton: "Delete",
      },
    },
  },
  dictionary: {
    notFound: "No words yet",
    buttons: {
      edit: "Edit",
      add: "Add",
    },
    language: "Language: {{ from }} - {{ to }} ",
    published: "Published",
    downloadCount: "Downloads: {{ count }}",
    created: "Created: {{ created }}",
    description: "Description",
    word: {
      description: "Description",
      translation: "Translation",
      transcription: "Transcription",
    },
    share: {
      title: "Join",
    },
    modal: {
      delete: {
        acceptText: "Delete",
        title: "Delete dictionary",
        subTitle: "Are you sure you want to delete the dictionary?",
      },
      publish: {
        acceptText: "Publish",
        title: "Publish dictionary",
        subTitle: "To publish, the dictionary must have at least one tag",
      },
      add: {
        acceptText: "Add",
        title: "Adding a dictionary",
        subTitle: "You already have this dictionary",
      },
    },
  },
  tags: {
    label: "Tags",
    required: "Please select at least 1 tag",
  },
  study: {
    empty: {
      title: "You don't have any words to memorize yet",
      subTitle: "Add a public dictionary or create your own",
      button: {
        public: "Public dictionaries",
        private: "Create a private dictionary",
      },
    },
    button: "Next",
    flashCard: {
      clue: "Click on the card to see the translation",
      apply: "I know",
      reject: "I don't know",
    },
    matching: {
      clue: "Drag the translation to the word",
      place: "Drop here",
    },
  },
  settings: {
    button: "Apply",
    title: "Settings",
    subTitle: "Please select the default language",
  },
};
