export const dict = {
  general: {
    sections: {
      dictionaries: "Diccionarios",
      publicDictionaries: "Diccionarios públicos",
      memorize: "Memorizar",
      progress: "Progreso",
      contacts: "Contactos",
    },
  },
  dictionaries: {
    title: "Diccionarios",
    button: "Crear diccionario",
    notFound: "No se encontraron diccionarios",
    tab: {
      private: "Privado",
      public: "Público",
      global: "Global",
    },
  },
  publicDictionaries: {
    notFound: "No se encontraron diccionarios públicos",
    filter: {
      title: "Filtros",
      button: "Filtrar",
      acceptText: "Aplicar",
    },
    button: "Agregar a los tuyos",
  },
  addEditDictionary: {
    basic: {
      title: "Nuevo diccionario",
      button: "Siguiente",
      form: {
        name: {
          label: "Nombre",
          emptyError: "Por favor, introduce un nombre",
          existError: "El nombre ya existe",
        },
        from: {
          label: "Idioma base",
          emptyError: "Por favor, selecciona un idioma",
          existError: "El idioma debe ser único",
        },
        to: {
          label: "Idioma de traducción",
          emptyError: "Por favor, selecciona un idioma",
          existError: "El idioma debe ser único",
        },
        description: "Descripción",
      },
    },
    words: {
      title: "Frases",
      button: {
        add: "Crear",
        edit: "Actualizar",
      },
      form: {
        from: {
          label: "Frase",
          error: "Por favor, introduce una frase",
        },
        to: {
          label: "Traducción",
          error: "Por favor, introduce una traducción",
        },
        transcription: "Transcripción",
        description: "Descripción",
        addButton: "Agregar frase",
        deleteButton: "Eliminar",
      },
    },
  },
  dictionary: {
    notFound: "Todavía no hay palabras",
    buttons: {
      edit: "Editar",
      add: "Agregar",
    },
    language: "Idioma: {{ from }} - {{ to }} ",
    published: "Publicado",
    downloadCount: "Descargas: {{ count }}",
    created: "Creado: {{ created }}",
    description: "Descripción",
    word: {
      description: "Descripción",
      translation: "Traducción",
      transcription: "Transcripción",
    },
    share: {
      title: "Únete",
    },
    modal: {
      delete: {
        acceptText: "Eliminar",
        title: "Eliminar diccionario",
        subTitle: "¿Estás seguro de que quieres eliminar el diccionario?",
      },
      publish: {
        acceptText: "Publicar",
        title: "Publicar diccionario",
        subTitle:
          "Para publicar, el diccionario debe tener al menos un etiqueta",
      },
      add: {
        acceptText: "Agregar",
        title: "Agregar un diccionario",
        subTitle: "Ya tienes este diccionario",
      },
    },
  },
  tags: {
    label: "Etiquetas",
    required: "Por favor, selecciona al menos 1 etiqueta",
  },
  study: {
    empty: {
      title: "Todavía no tienes palabras para memorizar",
      subTitle: "Agrega un diccionario público o crea el tuyo propio",
      button: {
        public: "Diccionarios públicos",
        private: "Crear un diccionario privado",
      },
    },
    button: "Siguiente",
    flashCard: {
      clue: "Haz clic en la tarjeta para ver la traducción",
      apply: "Lo sé",
      reject: "No lo sé",
    },
    matching: {
      clue: "Arrastra la traducción a la palabra",
      place: "Suelta aquí",
    },
  },
  settings: {
    button: "Aplicar",
    title: "Configuración",
    subTitle: "Por favor, seleccione el idioma predeterminado",
  },
};
