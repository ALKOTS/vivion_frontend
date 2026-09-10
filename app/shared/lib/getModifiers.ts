/**
 * Собирает строку CSS-модификаторов в БЭМ-стиле.
 *
 * @param modifiers - Названия модификаторов; `null` и `undefined` отбрасываются.
 * @returns Строка вида `_m _primary` либо `undefined`, если аргументов нет.
 * @example
 * getModifiers("m", undefined, "primary") // "_m _primary"
 */
export function getModifiers(...modifiers: (null | string | undefined)[]) {
  if (!Array.isArray(modifiers) || modifiers.length < 1) return

  return modifiers
    .reduce((acc: string[], val: null | string | undefined) => {
      if (typeof val === "string") {
        acc.push(`_${val}`)
      }
      return acc
    }, [])
    .join(" ")
}
