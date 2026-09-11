/** Пункт главного меню шапки. */
export interface AppHeaderNavigationItem {
  label: string
  to: string
}

/** Главное меню шапки; порядок — как в макете. */
export const appHeaderNavigation: AppHeaderNavigationItem[] = [
  { label: "Украшения", to: "#" },
  { label: "Помолвка и свадьба", to: "#" },
  { label: "Подарки", to: "#" },
  { label: "Эксклюзивные украшения", to: "#" },
  { label: "Дом La Vivion", to: "#" },
]
