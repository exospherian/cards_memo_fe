export const dict = {
  general: {
    sections: {
      dictionaries: "Dizionari",
      publicDictionaries: "Dizionari pubblici",
      memorize: "Memorizza",
      progress: "Progresso",
      contacts: "Contatti",
    },
  },
  dictionaries: {
    title: "Dizionari",
    button: "Crea dizionario",
    notFound: "Dizionari non trovati",
    tab: {
      private: "Privato",
      public: "Pubblico",
      global: "Globale",
    },
  },
  publicDictionaries: {
    notFound: "Dizionari pubblici non trovati",
    filter: {
      title: "Filtri",
      button: "Filtra",
      acceptText: "Applica",
    },
    button: "Aggiungi ai tuoi",
  },
  addEditDictionary: {
    basic: {
      title: "Nuovo dizionario",
      button: "Avanti",
      form: {
        name: {
          label: "Nome",
          emptyError: "Inserisci un nome",
          existError: "Il nome esiste già",
        },
        from: {
          label: "Lingua di base",
          emptyError: "Seleziona una lingua",
          existError: "La lingua deve essere unica",
        },
        to: {
          label: "Lingua di traduzione",
          emptyError: "Seleziona una lingua",
          existError: "La lingua deve essere unica",
        },
        description: "Descrizione",
      },
    },
    words: {
      title: "Frasi",
      button: {
        add: "Crea",
        edit: "Aggiorna",
      },
      form: {
        from: {
          label: "Frase",
          error: "Inserisci una frase",
        },
        to: {
          label: "Traduzione",
          error: "Inserisci una traduzione",
        },
        transcription: "Trascrizione",
        description: "Descrizione",
        addButton: "Aggiungi frase",
        deleteButton: "Elimina",
      },
    },
  },
  dictionary: {
    notFound: "Nessuna parola ancora",
    buttons: {
      edit: "Modifica",
      add: "Aggiungi",
    },
    language: "Lingua: {{ from }} - {{ to }} ",
    published: "Pubblicato",
    downloadCount: "Download: {{ count }}",
    created: "Creato: {{ created }}",
    description: "Descrizione",
    word: {
      description: "Descrizione",
      translation: "Traduzione",
      transcription: "Trascrizione",
    },
    share: {
      title: "Unisciti",
    },
    modal: {
      delete: {
        acceptText: "Elimina",
        title: "Elimina dizionario",
        subTitle: "Sei sicuro di voler eliminare il dizionario?",
      },
      publish: {
        acceptText: "Pubblica",
        title: "Pubblica dizionario",
        subTitle: "Per pubblicare, il dizionario deve avere almeno un tag",
      },
      add: {
        acceptText: "Aggiungi",
        title: "Aggiunta di un dizionario",
        subTitle: "Hai già questo dizionario",
      },
    },
  },
  tags: {
    label: "Tag",
    required: "Seleziona almeno 1 tag",
  },
  study: {
    empty: {
      title: "Non hai ancora parole da memorizzare",
      subTitle: "Aggiungi un dizionario pubblico o crea il tuo",
      button: {
        public: "Dizionari pubblici",
        private: "Crea un dizionario privato",
      },
    },
    button: "Avanti",
    flashCard: {
      clue: "Fai clic sulla carta per vedere la traduzione",
      apply: "Lo so",
      reject: "Non lo so",
    },
    matching: {
      clue: "Trascina la traduzione sulla parola",
      place: "Rilascia qui",
    },
  },
  settings: {
    button: "Applica",
    title: "Impostazioni",
    subTitle: "Si prega di selezionare la lingua predefinita",
  },
};
