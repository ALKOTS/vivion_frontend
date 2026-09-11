/** Статья блога. */
export interface Article {
  /** Описание. */
  description?: string
  /** Идентификатор. */
  id: string
  /** Путь к обложке. */
  img?: string
  /** Рубрики. */
  tags?: string[]
  /** Заголовок. */
  title?: string
}
