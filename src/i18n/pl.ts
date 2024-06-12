export const dict = {
  general: {
    sections: {
      dictionaries: "Słowniki",
      publicDictionaries: "Publiczne słowniki",
      memorize: "Zapamiętaj",
      progress: "Postęp",
      contacts: "Kontakty",
    },
  },
  dictionaries: {
    title: "Słowniki",
    button: "Utwórz słownik",
    notFound: "Nie znaleziono słowników",
    tab: {
      private: "Prywatne",
      public: "Publiczne",
      global: "Globalne",
    },
  },
  publicDictionaries: {
    notFound: "Nie znaleziono publicznych słowników",
    filter: {
      title: "Filtry",
      button: "Filtruj",
      acceptText: "Zastosuj",
    },
    button: "Dodaj do swoich",
  },
  addEditDictionary: {
    basic: {
      title: "Nowy słownik",
      button: "Dalej",
      form: {
        name: {
          label: "Nazwa",
          emptyError: "Proszę podać nazwę",
          existError: "Nazwa już istnieje",
        },
        from: {
          label: "Język bazowy",
          emptyError: "Proszę wybrać język",
          existError: "Język musi być unikalny",
        },
        to: {
          label: "Język tłumaczenia",
          emptyError: "Proszę wybrać język",
          existError: "Język musi być unikalny",
        },
        description: "Opis",
      },
    },
    words: {
      title: "Frazy",
      button: {
        add: "Utwórz",
        edit: "Aktualizuj",
      },
      form: {
        from: {
          label: "Frazy",
          error: "Proszę podać frazę",
        },
        to: {
          label: "Tłumaczenie",
          error: "Proszę podać tłumaczenie",
        },
        transcription: "Transkrypcja",
        description: "Opis",
        addButton: "Dodaj frazę",
        deleteButton: "Usuń",
      },
    },
  },
  dictionary: {
    notFound: "Nie ma jeszcze słów",
    buttons: {
      edit: "Edytuj",
      add: "Dodaj",
    },
    language: "Język: {{ from }} - {{ to }} ",
    published: "Opublikowane",
    downloadCount: "Pobrania: {{ count }}",
    created: "Utworzono: {{ created }}",
    description: "Opis",
    word: {
      description: "Opis",
      translation: "Tłumaczenie",
      transcription: "Transkrypcja",
    },
    share: {
      title: "Dołącz",
    },
    modal: {
      delete: {
        acceptText: "Usuń",
        title: "Usuwanie słownika",
        subTitle: "Czy na pewno chcesz usunąć słownik?",
      },
      publish: {
        acceptText: "Opublikuj",
        title: "Publikacja słownika",
        subTitle: "Aby opublikować, słownik musi mieć co najmniej jeden tag",
      },
      add: {
        acceptText: "Dodaj",
        title: "Dodawanie słownika",
        subTitle: "Masz już ten słownik",
      },
    },
  },
  tags: {
    label: "Tagi",
    required: "Proszę wybrać co najmniej 1 tag",
  },
  study: {
    empty: {
      title: "Nie masz jeszcze słów do zapamiętania",
      subTitle: "Dodaj publiczny słownik lub stwórz własny",
      button: {
        public: "Publiczne słowniki",
        private: "Utwórz prywatny słownik",
      },
    },
    button: "Dalej",
    flashCard: {
      clue: "Kliknij na kartę, aby zobaczyć tłumaczenie",
      apply: "Znam",
      reject: "Nie znam",
    },
    matching: {
      clue: "Przeciągnij tłumaczenie do słowa",
      place: "Upuść tutaj",
    },
  },
  settings: {
    button: "Zastosuj",
    title: "Ustawienia",
    subTitle: "Proszę wybrać domyślny język",
  },
};
