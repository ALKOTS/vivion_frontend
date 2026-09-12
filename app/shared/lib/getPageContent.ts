// Контент страниц лежит в public/content/*.json и попадает в сборку как обычный импорт.
const pages = import.meta.glob<unknown>("../../../public/content/*.json", {
  eager: true,
  import: "default",
})

/**
 * Возвращает контент страницы из `public/content/<page>.json`.
 *
 * @template T Форма контента страницы; описывается на самой странице.
 * @param page Имя файла без расширения, например `main-page`.
 * @returns Контент страницы.
 * @example
 * const { hero, shelves } = getPageContent<MainPageContent>("main-page")
 */
export const getPageContent = <T>(page: string): T => {
  const content = pages[`../../../public/content/${page}.json`]

  if (content === undefined) {
    throw new Error(`Нет файла контента public/content/${page}.json`)
  }

  return content as T
}
