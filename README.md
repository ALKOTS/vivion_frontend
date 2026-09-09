# LaVivion

Nuxt 4 + TypeScript + SCSS, организовано по [Feature-Sliced Design](https://feature-sliced.design/).

## Запуск

```bash
bun install
bun run dev      # http://localhost:3000
```

| Команда                   | Что делает                                         |
| ------------------------- | -------------------------------------------------- |
| `bun run dev`             | Дев-сервер с HMR                                   |
| `bun run build`           | Продакшен-сборка в `.output/`                      |
| `bun run preview`         | Локальный просмотр продакшен-сборки                |
| `bun run generate`        | Статическая пререндер-сборка                       |
| `bun run tokens`          | Пересобрать SCSS из выгрузок Figma в `tokens/`     |
| `bun run typecheck`       | Прогнать `vue-tsc` по всему проекту                |
| `bun run storybook`       | Storybook на http://localhost:6006                 |
| `bun run build-storybook` | Статическая сборка Storybook в `storybook-static/` |
| `bun run eslint`          | Линтер (успех = ноль предупреждений)               |
| `bun run eslint:fix`      | Линтер с автоисправлением                          |
| `bun run prettier`        | Проверить форматирование                           |
| `bun run prettier:write`  | Отформатировать                                    |

## Структура

Директория `app/` — корень исходников Nuxt, слои FSD живут внутри неё. Слой **app** из FSD —
это собственные соглашения Nuxt (`app.vue`, `layouts/`, `styles/`, `nuxt.config.ts`).

```
app/
├── app.vue              # корневой компонент: <NuxtLayout><NuxtPage /></NuxtLayout>
├── layouts/             # слой app — default.vue и другие макеты
├── styles/              # слой app — глобальный CSS (reset, базовые стили, шрифты)
├── pages/               # слой pages — он же файловый роутер Nuxt
├── widgets/             # составные секции страниц (шапка, сайдбар, ...)
├── features/            # действия пользователя, несущие бизнес-ценность
├── entities/            # бизнес-сущности (пользователь, товар, ...)
└── shared/              # переиспользуемый код без бизнес-смысла
    ├── ui/              #   примитивы дизайн-системы
    ├── lib/  api/  config/  types/
    └── styles/          #   SCSS-абстракции + сгенерированные дизайн-токены

.storybook/              # конфигурация Storybook
config/scss.ts           # настройки Sass и алиасы слоёв для nuxt.config
tokens/                  # выгрузки переменных Figma (JSON в формате DTCG)
scripts/build-tokens.mjs # tokens/*.json -> app/shared/styles/tokens/*.scss
```

Правило импортов одностороннее: слой может импортировать только из слоёв **ниже** себя.

```
app -> pages -> widgets -> features -> entities -> shared
```

### Импорты

Для каждого слоя есть алиас (`@shared`, `@entities`, `@features`, `@widgets`, `@pages`,
`@app`) — вместе с привычным для Nuxt `~/`:

```ts
import type { Product } from "@entities/product/model/types"
```

Чаще всего они не нужны, потому что автоимпорт настроен по слоям:

- **Компоненты** — каждый `*.vue` внутри `shared/ui/` и внутри сегмента `ui/` любого слайса
  регистрируется глобально, без префикса пути:
  `widgets/app-header/ui/AppHeader.vue` → `<AppHeader />`.
- **Композаблы и хелперы** — всё из `shared/lib`, `shared/config` и из сегментов `model/`
  и `lib/` каждого слайса.

Поэтому не делайте бочки `index.ts` внутри автоимпортируемых директорий: реэкспорт
зарегистрирует то же имя дважды.

## Стили

`app/shared/styles/_abstracts.scss` подставляется в каждый файл стилей и в каждый блок
`<style lang="scss">`, так что миксины брейкпоинтов и хелперы всегда доступны без `@use`.
Дизайн-токены используются как обычные CSS-переменные:

```vue
<style scoped lang="scss">
.card {
  padding: var(--spacing-16);
  color: var(--additional-gray-900);

  @include up(md) {
    padding: var(--spacing-32);
  }
}
</style>
```

### Брейкпоинты

```scss
$breakpoints: (
  sm: 0,
  md: 768px,
  lg: 1280px,
  xl: 1536px,
  xxl: 1920px,
);
```

`sm` — база mobile-first со значением `0`, поэтому `up(sm)` вообще не создаёт медиазапрос.
`down()` останавливается на 0.02px раньше следующего брейкпоинта, так что `up(md)` и
`down(sm)` никогда не срабатывают на одной ширине.

| Миксин     | Результат              |
| ---------- | ---------------------- |
| `up(md)`   | `min-width: 768px`     |
| `down(md)` | `max-width: 1279.98px` |

Шкала задана один раз в `app/shared/styles/_breakpoints.scss`; генератор токенов парсит
эту же карту, а не хранит свою копию.

Точка входа с абстракциями не должна выводить CSS. Всё, что порождает вывод, лежит в
`app/styles/main.scss` — единственном глобальном файле стилей, подключённом из
`nuxt.config.ts`.

## Storybook

Витрина компонентов живёт в Storybook, отдельной демо-страницы в приложении нет.

```bash
bun run storybook          # http://localhost:6006
bun run build-storybook    # статическая сборка в storybook-static/
```

Истории лежат рядом с компонентами, внутри своих слайсов FSD:
`app/shared/ui/base-button/BaseButton.stories.ts`. Отдельная история
`app/shared/styles/DesignTokens.stories.ts` показывает палитру, шкалу отступов и
типографику.

### Почему Nuxt зафиксирован на 4.4.8

Версия Nuxt подобрана под Storybook.

`@storybook-vue/nuxt` объявляет `vite ^5 || ^6 || ^7`. Nuxt 4.4.8 тянет `vite ^7.3.3`,
поэтому обе стороны используют одну копию vite и всё сходится само собой.

Начиная с Nuxt 4.5 `@nuxt/vite-builder` требует `vite ^8.2.0`, и пересечения с модулем
больше нет. Это ломает Storybook сразу в двух местах:
