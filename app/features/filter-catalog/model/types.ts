/** Идентификатор карточки «Смотреть всё»: сбрасывает фильтр. */
export const ALL_FILTER_ID = "all"

/** Query-параметр, в котором хранится выбранный фильтр. */
export const CATALOG_FILTER_QUERY = "category"

/**
 * Минимум, что фильтру нужно знать о полке товаров.
 * Структурно совместим с `ProductShelf` из виджета — импортировать его сюда нельзя.
 */
export interface FilterableShelf {
  /** Идентификатор полки; совпадает с `QuickFilter.id`. */
  id: string
  /** Товары полки; пустая полка выключает свой фильтр. */
  products?: unknown[]
}
