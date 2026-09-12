/** Быстрый фильтр каталога. */
export interface QuickFilter {
  /** Идентификатор фильтра. */
  id: string
  /** Путь к картинке для `<NuxtImg>`. */
  img?: string
  /** Подпись под картинкой, например `Классические`. */
  name: string
}
