export const dict = {
  general: {
    sections: {
      dictionaries: "Словари",
      publicDictionaries: "Публичные словари",
      memorize: "Запоминание",
      progress: "Прогресс",
      contacts: "Контакты",
    },
  },
  dictionaries: {
    title: "Словари",
    button: "Создать cловарь",
    notFound: "Словари не найдены",
    tab: {
      private: "Приватные",
      public: "Публичные",
      global: "Глобальные",
    },
  },
  publicDictionaries: {
    notFound: "Публичные словари не найдены",
    filter: {
      title: "Фильтры",
      button: "Фильтр",
      acceptText: "Применить",
    },
    button: "Добавить к себе",
  },
  addEditDictionary: {
    basic: {
      title: "Новый cловарь",
      button: "Далее",
      form: {
        name: {
          label: "Название",
          emptyError: "Пожалуйста, введите название",
          existError: "Имя уже существует",
        },
        from: {
          label: "Базовый язык",
          emptyError: "Пожалуйста, выберите язык",
          existError: "Языка должен быть уникальным",
        },
        to: {
          label: "Язык перевода",
          emptyError: "Пожалуйста, выберите язык",
          existError: "Языка должен быть уникальным",
        },
        description: "Описание",
      },
    },
    words: {
      title: "Фразы",
      button: {
        add: "Создать",
        edit: "Обновить",
      },
      form: {
        from: {
          label: "Фраза",
          error: "Пожалуйста, введите фразу",
        },
        to: {
          label: "Перевод",
          error: "Пожалуйста, введите перевод",
        },
        transcription: "Транскрипция",
        description: "Описание",
        addButton: "Добавить фразу",
        deleteButton: "Удалить",
      },
    },
  },
  dictionary: {
    notFound: "Слов пока нету",
    buttons: {
      edit: "Редактировать",
      add: "Добавить",
    },
    language: "Язык: {{ from }} - {{ to }} ",
    published: "Опубликовано",
    downloadCount: "Загрузки: {{ count }}",
    created: "Создано: {{ created }}",
    description: "Описание",
    share: {
      title: "Присоeдиняйся",
    },
    word: {
      desctiption: "Описание",
      translation: "Перевод",
      transcription: "Транскрипция",
    },
    modal: {
      delete: {
        acceptText: "Удалить",
        title: "Удаление словаря",
        subTitle: "Вы точно хотите удалить словарь?",
      },
      publish: {
        acceptText: "Опубликовать",
        title: "Публикация словаря",
        subTitle: "Для публикации словарь должен иметь как миниму один тег",
      },
      add: {
        acceptText: "Добавить",
        title: "Добавление словаря",
        subTitle: "Данный словарь уже есть у вас",
      },
    },
  },
  tags: {
    label: "Теги",
    required: "Пожалуйста, выберите минимум 1 тег",
  },
  study: {
    empty: {
      title: "У вас пока нет слов для запоминания",
      subTitle: "Добавьте себе публичный словарь или создайте свой",
      button: {
        public: "Публичные словари",
        private: "Создать приватный словарь",
      },
    },
    button: "Далее",
    flashCard: {
      clue: "Нажмите на карточку что бы увидеть перевод",
      apply: "Я знаю",
      reject: "Я не знаю",
    },
    matching: {
      clue: "Перетащите перевод к слову",
      place: "Брось сюда",
    },
  },
  settings: {
    button: "Применить",
    title: "Настройки",
    subTitle: "Пожалуйста, выберите язык по умолчанию",
  },
};
