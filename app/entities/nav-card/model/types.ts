/** Навигационная карточка каталога. */
export interface NavCard {
  /** Фото. */
  img?: string
  /** Подпись. */
  label?: string
  /** Размер карточки */
  size?: NavCardSize
  /** Заголовок. */
  title?: string
  /** Адрес ссылки. */
  to?: string
}

type NavCardSize = "l" | "s"
