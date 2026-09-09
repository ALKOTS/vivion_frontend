#!/usr/bin/env node
/**
 * Дизайн-токены Figma -> SCSS.
 *
 * Читает все `tokens/*.tokens.json` и пишет два файла в app/shared/styles/tokens:
 * `_css-vars.scss` — CSS-переменные для :root / [data-theme];
 * `_variables.scss` — карта $tokens и плоские Sass-переменные $token-*.
 */

import { existsSync } from "node:fs"
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const tokensDir = path.join(root, "tokens")
const stylesDir = path.join(root, "app", "shared", "styles")
const outDir = path.join(stylesDir, "tokens")

const FALLBACK_BREAKPOINTS = new Map([
  ["lg", "1280px"],
  ["md", "768px"],
  ["sm", "0"],
  ["xl", "1536px"],
  ["xxl", "1920px"],
])

/** Суффиксы имён файлов выгрузок. */
const TOKENS_SUFFIX = /\.tokens\.json$/i
const JSON_SUFFIX = /\.json$/i

/** Ссылка на другой токен: `{color.brand.primary}`. */
const ALIAS = /^\{[^{}]+\}$/

/** Тело карты `$breakpoints: ( ... )`. */
const BREAKPOINTS_BLOCK = /\$breakpoints:\s*\(([^)]*)\)/

/**
 * Одна пара `имя: значение` внутри карты.
 *
 * Значение захватывается жадно и обрезается уже в JS: если дописать сюда хвост
 * вида `\s*,?\s*$`, соседние квантификаторы начнут «делить» одни и те же пробелы,
 * и на длинной строке это даёт экспоненциальный бэктрекинг.
 */
const BREAKPOINT_ENTRY = /^[ \t]*['"]?([\w-]+)['"]?[ \t]*:[ \t]*([^,\n]+)/gm

/**
 * Читает карту `$breakpoints` из `_breakpoints.scss`.
 *
 * @returns {Promise<Map<string, string>>} Имя брейкпоинта -> значение ширины.
 */
async function readBreakpoints() {
  try {
    const source = await readFile(
      path.join(stylesDir, "_breakpoints.scss"),
      "utf8",
    )
    const block = source.match(BREAKPOINTS_BLOCK)
    if (!block) throw new Error("no $breakpoints map found")

    const entries = [...block[1].matchAll(BREAKPOINT_ENTRY)]
    if (entries.length === 0) throw new Error("$breakpoints map is empty")

    return new Map(entries.map(([, name, value]) => [name, value.trim()]))
  } catch (error) {
    console.warn(
      `  ! не удалось прочитать $breakpoints (${error.message}); беру значения по умолчанию`,
    )
    return FALLBACK_BREAKPOINTS
  }
}

const LENGTH_TYPES = new Set([
  "borderRadius",
  "borderWidth",
  "dimension",
  "fontSize",
  "letterSpacing",
  "paragraphSpacing",
  "sizing",
  "spacing",
])

const BANNER =
  "// СГЕНЕРИРОВАНО АВТОМАТИЧЕСКИ скриптом scripts/build-tokens.mjs — не редактировать.\n" +
  "// Источник: tokens/*.tokens.json. Пересобрать: `bun run tokens`.\n"

/**
 * Имена переменных Figma становятся именами CSS-переменных, поэтому всё, что не является
 * допустимым символом CSS-идентификатора, удаляется: Figma разрешает в имени `!`, `%`,
 * `(`, пробелы и прочее (например, `brandMarine/800!`).
 *
 * @param segment Сегмент имени переменной Figma.
 * @returns {string} Безопасный фрагмент CSS-идентификатора.
 */
const kebab = (segment) =>
  String(segment)
    .replaceAll(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replaceAll(/[\s_.]+/g, "-")
    .replaceAll(/[^a-z0-9-]/gi, "")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-|-$/g, "")
    .toLowerCase()

const isToken = (node) =>
  node !== null &&
  typeof node === "object" &&
  !Array.isArray(node) &&
  ("$value" in node || "value" in node)

/**
 * `{color.brand.primary}` -> `color-brand-primary`
 *
 * @param raw Значение токена — возможно, ссылка на другой токен.
 * @returns {string|null} Имя цели или null, если это не ссылка.
 */
const aliasTarget = (raw) =>
  typeof raw === "string" && ALIAS.test(raw.trim())
    ? raw
        .trim()
        .slice(1, -1)
        .split(".")
        .map((segment) => kebab(segment))
        .join("-")
    : null

function flatten(node, trail, out, inheritedType) {
  if (isToken(node)) {
    const name = trail.map((segment) => kebab(segment)).join("-")
    const type = node.$type ?? node.type ?? inheritedType
    const value = node.$value ?? node.value

    if (value === "" || value === null || value === undefined) {
      console.warn(`  ! пропущен \`${name}\`: пустое значение`)
      return
    }

    if (type === "shadow" || type === "boxShadow") {
      out.push({ name, value: formatShadow(value) })
      return
    }
    // Составные токены (типографика, границы, ...) разворачиваются в токен на каждое свойство.
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !("unit" in value)
    ) {
      for (const [key, sub] of Object.entries(value)) {
        out.push({
          name: `${name}-${kebab(key)}`,
          value: formatScalar(sub, key),
        })
      }
      return
    }
    out.push({ name, value: formatScalar(value, type) })
    return
  }

  if (node && typeof node === "object" && !Array.isArray(node)) {
    const groupType = node.$type ?? node.type ?? inheritedType
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith("$")) continue
      flatten(child, [...trail, key], out, groupType)
    }
  }
}

function formatScalar(value, type) {
  if (typeof value === "number") {
    return LENGTH_TYPES.has(type) && value !== 0 ? `${value}px` : String(value)
  }

  if (
    value &&
    typeof value === "object" &&
    "unit" in value &&
    "value" in value
  ) {
    return `${value.value}${value.unit}`
  }
  return String(value).trim()
}

function formatShadow(value) {
  const layers = Array.isArray(value) ? value : [value]
  return layers
    .map((layer) => {
      const parts = [
        layer.inset || layer.type === "innerShadow" ? "inset" : null,
        formatScalar(layer.offsetX ?? layer.x ?? 0, "dimension"),
        formatScalar(layer.offsetY ?? layer.y ?? 0, "dimension"),
        formatScalar(layer.blur ?? 0, "dimension"),
        formatScalar(layer.spread ?? 0, "dimension"),
        layer.color,
      ]
      return parts.filter(Boolean).join(" ")
    })
    .join(", ")
}

async function main() {
  if (!existsSync(tokensDir)) await mkdir(tokensDir, { recursive: true })
  await mkdir(outDir, { recursive: true })

  const dirEntries = await readdir(tokensDir)
  const files = dirEntries
    .filter((entry) => entry.toLowerCase().endsWith(".json"))
    .toSorted()

  const byMode = new Map()

  for (const file of files) {
    const raw = await readFile(path.join(tokensDir, file), "utf8")
    let json
    try {
      json = JSON.parse(raw)
    } catch (error) {
      console.error(`  x ${file}: некорректный JSON — ${error.message}`)
      process.exitCode = 1
      continue
    }

    const mode = modeOf(file)
    const entries = []
    flatten(json, [], entries)

    const bucket = byMode.get(mode) ?? new Map()
    for (const { name, value } of entries) {
      const alias = aliasTarget(value)
      bucket.set(name, alias ? `var(--${alias})` : value)
    }
    byMode.set(mode, bucket)
    const modeLabel = mode ? ` [${mode}]` : ""
    console.log(`  + ${file} -> ${entries.length} токенов${modeLabel}`)
  }

  const breakpoints = await readBreakpoints()
  const modes = sortModes(byMode.keys(), breakpoints)

  let css = BANNER
  if (modes.length === 0) {
    css +=
      "\n// В tokens/ нет ни одного файла. Положите туда выгрузку из Figma и запустите снова.\n"
  }
  for (const mode of modes) {
    css += renderMode(mode, byMode.get(mode), breakpoints)
  }
  await writeFile(path.join(outDir, "_css-vars.scss"), css, "utf8")

  const baseMode = [...breakpoints].find(([, width]) => width === "0")?.[0]
  const literals = new Map([
    ...(byMode.get(null) ?? []),
    ...(byMode.get(baseMode) ?? []),
  ])
  const resolved = Array.from(literals.keys(), (name) => [
    name,
    resolveLiteral(name, literals) ?? literals.get(name),
  ])

  let scss = BANNER
  if (resolved.length === 0) {
    scss +=
      "\n// В tokens/ нет ни одного файла. Положите туда выгрузку из Figma и запустите снова.\n\n$tokens: ();\n"
  } else {
    scss +=
      "\n// Литеральные значения токенов — для использования на этапе Sass (вычисления, цвет, медиа).\n" +
      "// В компонентах используйте CSS-переменную напрямую — `padding: var(--spacing-16)` —\n" +
      "// тогда переопределения по брейкпоинтам и темам работают в рантайме.\n"
    scss += "\n$tokens: (\n"
    for (const [name, value] of resolved)
      scss += `  '${name}': ${sassValue(value)},\n`
    scss += ");\n\n"
    for (const [name, value] of resolved)
      scss += `$token-${name}: ${sassValue(value)};\n`
  }
  await writeFile(path.join(outDir, "_variables.scss"), scss, "utf8")

  const total = [...byMode.values()].reduce(
    (sum, bucket) => sum + bucket.size,
    0,
  )
  console.log(
    `\n  ${total} токенов, режимов: ${modes.length} -> app/shared/styles/tokens/`,
  )
}

function modeOf(filename) {
  const stem = filename.replace(TOKENS_SUFFIX, "").replace(JSON_SUFFIX, "")
  const parts = stem.split(".")
  return parts.length > 1 ? kebab(parts.at(-1)) : null
}

/**
 * Выводит CSS-переменные одного режима.
 *
 * - без режима / базовый брейкпоинт -> обычный `:root`
 * - имя брейкпоинта                 -> `@media (min-width: ...) { :root { ... } }`
 * - всё остальное                   -> `[data-theme='<режим>']`
 *
 * @param mode
 * @param tokens
 * @param breakpoints
 */
function renderMode(mode, tokens, breakpoints) {
  const declarations = Array.from(
    tokens,
    ([name, value]) => `  --${name}: ${value};`,
  ).join("\n")
  const width = mode === null ? null : breakpoints.get(mode)

  if (width && width !== "0") {
    const indented = declarations.replaceAll(/^/gm, "  ")
    return `\n@media (min-width: ${width}) {\n  :root {\n${indented}\n  }\n}\n`
  }

  const selector =
    mode === null || breakpoints.has(mode)
      ? ":root"
      : `:root[data-theme='${mode}'], [data-theme='${mode}']`

  return `\n${selector} {\n${declarations}\n}\n`
}

function resolveLiteral(name, literals, seen = new Set()) {
  const value = literals.get(name)
  if (value === undefined) return null
  const target = value.startsWith("var(--")
    ? value.slice(6, value.indexOf(")"))
    : null
  if (!target) return value
  if (seen.has(name)) {
    console.warn(`  ! циклический алиас в "${name}"`)
    return value
  }
  seen.add(name)
  return resolveLiteral(target, literals, seen) ?? value
}

function sassValue(value) {
  let depth = 0
  let quote = null

  for (const char of value) {
    if (quote) {
      if (char === quote) quote = null
      continue
    }
    switch (char) {
      case '"':
      case "'":
        quote = char
        break

      case "(":
      case "[":
        depth += 1
        break

      case ")":
      case "]":
        depth -= 1
        break

      default:
        if (char === "," && depth === 0) return `(${value})`
    }
  }

  return value
}

/**
 * Сначала null, затем брейкпоинты по порядку шкалы, затем темы по алфавиту.
 *
 * @param modes Итератор имён режимов (ключи Map), а не массив.
 * @param breakpoints Карта брейкпоинтов — задаёт порядок.
 * @returns {Array<string|null>} Отсортированный список режимов.
 */
function sortModes(modes, breakpoints) {
  const order = [...breakpoints.keys()]
  const rank = (mode) => {
    if (mode === null) return 0
    const index = order.indexOf(mode)
    return index === -1 ? 1 + order.length : 1 + index
  }

  // `modes` — итератор, поэтому сначала разворачиваем его в массив.
  return [...modes].toSorted(
    (a, b) => rank(a) - rank(b) || String(a).localeCompare(String(b)),
  )
}

await main()
