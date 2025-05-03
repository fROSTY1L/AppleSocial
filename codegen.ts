import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:5000/graphql', // Ваш бекенд-эндпоинт
  documents: ['src/**/*.{graphql,ts,tsx}'], // Ищем GraphQL-запросы во всех файлах
  generates: {
    './src/types/graphql.ts': { // Глобальные типы
      plugins: ['typescript'],
      config: {
        skipTypename: false,
        enumsAsTypes: true,
        scalars: {
          // Кастомные скалярные типы (пример для даты)
          DateTime: 'string',
          UUID: 'string'
        }
      }
    },
    './src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'types/graphql.ts', // Путь относительно генерируемых файлов
      },
      plugins: [
        'typescript-operations',
        'typescript-react-query'
      ],
      config: {
        reactQueryVersion: 5,
        exposeQueryKeys: true,
        exposeFetcher: true,
        fetcher: {
          endpoint: 'http://localhost:4000/graphql',
          fetchParams: {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        },
        // Дополнительные настройки для React Query
        addInfiniteQuery: true,
        legacyMode: false
      }
    }
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'] // Форматирование после генерации
  }
};

export default config;