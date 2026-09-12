/** Блок блога. */
export interface Blog {
  /** Статьи для показа. */
  cards?: Article[]
  /** Сколько ещё статей в блоге. */
  count?: number
  /** Заголовок блока. */
  title?: string
  /** Адрес «Все статьи». */
  to?: string
}
