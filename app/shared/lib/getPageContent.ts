// Контент страниц лежит в app/assets/content/*.json и попадает в сборку как обычный импорт.
// Путь относительно этого файла; ключи `pages` совпадают с ним.
const CONTENT_DIR = "../../assets/content"

const pages = import.meta.glob<unknown>("../../assets/content/*.json", {
  eager: true,
  import: "default",
})

/**
 * Возвращает контент страницы из `app/assets/content/<page>.json`.
 *
 * @template T Форма контента страницы; описывается на самой странице.
 * @param page Имя файла без расширения, например `main-page`.
 * @returns Контент страницы.
 * @example
 * const { hero, shelves } = getPageContent<MainPageContent>("main-page")
 */
export const getPageContent = <T>(page: string): T => {
  const content = pages[`${CONTENT_DIR}/${page}.json`]

  if (content === undefined) {
    throw new Error(`Нет файла контента app/assets/content/${page}.json`)
  }

  return content as T
}
