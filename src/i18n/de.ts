export const dict = {
  general: {
    sections: {
      dictionaries: "Wörterbücher",
      publicDictionaries: "Öffentliche Wörterbücher",
      memorize: "Merken",
      progress: "Fortschritt",
      contacts: "Kontakte",
    },
  },
  dictionaries: {
    title: "Wörterbücher",
    button: "Wörterbuch erstellen",
    notFound: "Wörterbücher nicht gefunden",
    tab: {
      private: "Privat",
      public: "Öffentlich",
      global: "Global",
    },
  },
  publicDictionaries: {
    notFound: "Öffentliche Wörterbücher nicht gefunden",
    filter: {
      title: "Filter",
      button: "Filtern",
      acceptText: "Anwenden",
    },
    button: "Zu den eigenen hinzufügen",
  },
  addEditDictionary: {
    basic: {
      title: "Neues Wörterbuch",
      button: "Weiter",
      form: {
        name: {
          label: "Name",
          emptyError: "Bitte geben Sie einen Namen ein",
          existError: "Name existiert bereits",
        },
        from: {
          label: "Basissprache",
          emptyError: "Bitte wählen Sie eine Sprache aus",
          existError: "Sprache muss eindeutig sein",
        },
        to: {
          label: "Übersetzungssprache",
          emptyError: "Bitte wählen Sie eine Sprache aus",
          existError: "Sprache muss eindeutig sein",
        },
        description: "Beschreibung",
      },
    },
    words: {
      title: "Phrasen",
      button: {
        add: "Erstellen",
        edit: "Aktualisieren",
      },
      form: {
        from: {
          label: "Phrase",
          error: "Bitte geben Sie eine Phrase ein",
        },
        to: {
          label: "Übersetzung",
          error: "Bitte geben Sie eine Übersetzung ein",
        },
        transcription: "Transkription",
        description: "Beschreibung",
        addButton: "Phrase hinzufügen",
        deleteButton: "Löschen",
      },
    },
  },
  dictionary: {
    notFound: "Noch keine Wörter vorhanden",
    buttons: {
      edit: "Bearbeiten",
      add: "Hinzufügen",
    },
    language: "Sprache: {{ from }} - {{ to }} ",
    published: "Veröffentlicht",
    downloadCount: "Downloads: {{ count }}",
    created: "Erstellt: {{ created }}",
    description: "Beschreibung",
    word: {
      description: "Beschreibung",
      translation: "Übersetzung",
      transcription: "Transkription",
    },
    share: {
      title: "Beitreten",
    },
    modal: {
      delete: {
        acceptText: "Löschen",
        title: "Wörterbuch löschen",
        subTitle: "Sind Sie sicher, dass Sie das Wörterbuch löschen möchten?",
      },
      publish: {
        acceptText: "Veröffentlichen",
        title: "Wörterbuch veröffentlichen",
        subTitle:
          "Um zu veröffentlichen, muss das Wörterbuch mindestens ein Tag haben",
      },
      add: {
        acceptText: "Hinzufügen",
        title: "Ein Wörterbuch hinzufügen",
        subTitle: "Sie haben dieses Wörterbuch bereits",
      },
    },
  },
  tags: {
    label: "Tags",
    required: "Bitte wählen Sie mindestens 1 Tag",
  },
  study: {
    empty: {
      title: "Sie haben noch keine Wörter zum Merken",
      subTitle:
        "Fügen Sie ein öffentliches Wörterbuch hinzu oder erstellen Sie Ihr eigenes",
      button: {
        public: "Öffentliche Wörterbücher",
        private: "Privates Wörterbuch erstellen",
      },
    },
    button: "Weiter",
    flashCard: {
      clue: "Klicken Sie auf die Karte, um die Übersetzung zu sehen",
      apply: "Ich weiß",
      reject: "Ich weiß nicht",
    },
    matching: {
      clue: "Ziehen Sie die Übersetzung zum Wort",
      place: "Hier ablegen",
    },
  },
  settings: {
    button: "Anwenden",
    title: "Einstellungen",
    subTitle: "Bitte wählen Sie die Standardsprache aus",
  },
};
