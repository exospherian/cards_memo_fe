export const dict = {
  general: {
    sections: {
      dictionaries: "Dictionnaires",
      publicDictionaries: "Dictionnaires publics",
      memorize: "Mémoriser",
      progress: "Progrès",
      contacts: "Contacts",
    },
  },
  dictionaries: {
    title: "Dictionnaires",
    button: "Créer un dictionnaire",
    notFound: "Dictionnaires non trouvés",
    tab: {
      private: "Privé",
      public: "Public",
      global: "Global",
    },
  },
  publicDictionaries: {
    notFound: "Dictionnaires publics non trouvés",
    filter: {
      title: "Filtres",
      button: "Filtrer",
      acceptText: "Appliquer",
    },
    button: "Ajouter aux vôtres",
  },
  addEditDictionary: {
    basic: {
      title: "Nouveau dictionnaire",
      button: "Suivant",
      form: {
        name: {
          label: "Nom",
          emptyError: "Veuillez entrer un nom",
          existError: "Le nom existe déjà",
        },
        from: {
          label: "Langue de base",
          emptyError: "Veuillez sélectionner une langue",
          existError: "La langue doit être unique",
        },
        to: {
          label: "Langue de traduction",
          emptyError: "Veuillez sélectionner une langue",
          existError: "La langue doit être unique",
        },
        description: "Description",
      },
    },
    words: {
      title: "Phrases",
      button: {
        add: "Créer",
        edit: "Mettre à jour",
      },
      form: {
        from: {
          label: "Phrase",
          error: "Veuillez entrer une phrase",
        },
        to: {
          label: "Traduction",
          error: "Veuillez entrer une traduction",
        },
        transcription: "Transcription",
        description: "Description",
        addButton: "Ajouter une phrase",
        deleteButton: "Supprimer",
      },
    },
  },
  dictionary: {
    notFound: "Pas encore de mots",
    buttons: {
      edit: "Éditer",
      add: "Ajouter",
    },
    language: "Langue : {{ from }} - {{ to }} ",
    published: "Publié",
    downloadCount: "Téléchargements : {{ count }}",
    created: "Créé : {{ created }}",
    description: "Description",
    word: {
      description: "Description",
      translation: "Traduction",
      transcription: "Transcription",
    },
    share: {
      title: "Rejoindre",
    },
    modal: {
      delete: {
        acceptText: "Supprimer",
        title: "Supprimer le dictionnaire",
        subTitle: "Êtes-vous sûr de vouloir supprimer le dictionnaire ?",
      },
      publish: {
        acceptText: "Publier",
        title: "Publier le dictionnaire",
        subTitle: "Pour publier, le dictionnaire doit avoir au moins un tag",
      },
      add: {
        acceptText: "Ajouter",
        title: "Ajout d'un dictionnaire",
        subTitle: "Vous avez déjà ce dictionnaire",
      },
    },
  },
  tags: {
    label: "Tags",
    required: "Veuillez sélectionner au moins 1 tag",
  },
  study: {
    empty: {
      title: "Vous n'avez pas encore de mots à mémoriser",
      subTitle: "Ajoutez un dictionnaire public ou créez le vôtre",
      button: {
        public: "Dictionnaires publics",
        private: "Créer un dictionnaire privé",
      },
    },
    button: "Suivant",
    flashCard: {
      clue: "Cliquez sur la carte pour voir la traduction",
      apply: "Je sais",
      reject: "Je ne sais pas",
    },
    matching: {
      clue: "Faites glisser la traduction vers le mot",
      place: "Déposez ici",
    },
  },
  settings: {
    button: "Appliquer",
    title: "Paramètres",
    subTitle: "Veuillez sélectionner la langue par défaut",
  },
};
