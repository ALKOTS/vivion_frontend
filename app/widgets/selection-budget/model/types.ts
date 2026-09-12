/** Подборка «По бюджету». */
export interface SelectionBudget {
  /**
   * Карточки ценовых диапазонов.
   */
  cards?: Omit<NavCard, "size">[]
  /** Заголовок подборки. */
  title?: string
}
