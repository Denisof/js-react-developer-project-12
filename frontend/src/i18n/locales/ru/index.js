export default {
  ru: {
    translation: {
      notFound: 'Ошибка 404: Страница не найдена',
      errors: {
        network: 'Ошибка соединения',
      },
      form: {
        fields: {
          submit: 'Отправить',
          cancel: 'Отменить',
        },
        errors: {
          validation: {
            min_length_one: 'Не менее {{count}} символ',
            min_length_few: 'Не менее {{count}} символа',
            min_length_many: 'Не менее {{count}} символов',
            between_length: 'От {{min}} до {{max}} символов',
          },
        },
      },
      registration: {
        registration: 'Регистрация',
        prompt: 'Нет аккаунта?',
        form: {
          fields: {
            username: 'Имя пользователя',
            password: 'Пароль',
            passwordConfirmation: 'Подтвердите пароль',
          },
          errors: {
            validation: {
              usernameRequired: 'Имя пользователя обязательно',
              passwordRequired: 'Пароль обязателен',
              passwordConfirmationRequired: 'Подтверждение пароля обязательно',
              passwordsMustMatch: 'Пароли должны совпадать',
              usernameAlreadyExists: 'Такой пользователь уже существует',
            },
          },
          buttons: {
            submit: 'Зарегистрироваться',
          },
        },
      },
      login: {
        login: 'Войти',
        login_error: 'Неверные имя пользователя или пароль',
        fields: {
          username: 'Ваш ник',
          password: 'Пароль',
        },
      },
      chat: {
        buttons: {
          logout: 'Выйти',
        },
        title: 'Hexlet Chat',
        channels: {
          channels: 'Каналы',
          channel_management: 'Управление каналом',
          action_rename: 'Переименовать',
          action_remove: 'Удалить',
          action_add: 'Добавить канал',
          form: {
            title_rename: 'Переименовать канал',
            title_remove: 'Удалить канал',
            fields: {
              name: 'Имя канала',
            },
            errors: {
              validation: {
                nameRequired: 'Имя канала обязательно',
                unique: 'Имя канала занято',
              },
            },
            success: {
              channelAdded: 'Канал создан',
              channelRemoved: 'Канал удалён',
              channelRenamed: 'Канал переименован',
            },
          },
        },
        active_chat: {
          message_count_one: '{{count}} сообщение',
          message_count_few: '{{count}} сообщения',
          message_count_many: '{{count}} сообщений',
          form: {
            fields: {
              message: 'Введите сообщение...',
              message_label: 'Новое сообщение',
            },
          },
        },
      },
    },
  },
};
