#!/usr/bin/env node
/**
 * Дизайн-токены Figma -> SCSS.
 *
 * Читает все `tokens/*.tokens.json` и пишет:
 *   app/shared/styles/tokens/_css-vars.scss   CSS-переменные для :root / [data-theme]
 *   app/shared/styles/tokens/_variables.scss  карта $tokens + плоские Sass-переменные $token-*
 *
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const tokensDir = path.join(root, 'tokens')
const stylesDir = path.join(root, 'app', 'shared', 'styles')
const outDir = path.join(stylesDir, 'tokens')

const FALLBACK_BREAKPOINTS = new Map([
  ['sm', '0'],
  ['md', '768px'],
  ['lg', '1280px'],
  ['xl', '1536px'],
  ['xxl', '1920px'],
])

/**
 * Читает карту `$breakpoints` из `_breakpoints.scss`.
 */
async function readBreakpoints() {
  try {
    const source = await readFile(path.join(stylesDir, '_breakpoints.scss'), 'utf8')
    const block = source.match(/\$breakpoints:\s*\(([^)]*)\)/)
    if (!block) throw new Error('no $breakpoints map found')

    const entries = [...block[1].matchAll(/^\s*['"]?([\w-]+)['"]?\s*:\s*([^,\n]+?)\s*,?\s*$/gm)]
    if (entries.length === 0) throw new Error('$breakpoints map is empty')

    return new Map(entries.map(([, name, value]) => [name, value]))
  } catch (error) {
    console.warn(`  ! не удалось прочитать $breakpoints (${error.message}); беру значения по умолчанию`)
    return FALLBACK_BREAKPOINTS
  }
}

const LENGTH_TYPES = new Set([
  'dimension',
  'spacing',
  'sizing',
  'borderRadius',
  'borderWidth',
  'fontSize',
  'letterSpacing',
  'paragraphSpacing',
])

const BANNER =
  '// СГЕНЕРИРОВАНО АВТОМАТИЧЕСКИ скриптом scripts/build-tokens.mjs — не редактировать.\n' +
  '// Источник: tokens/*.tokens.json. Пересобрать: `bun run tokens`.\n'

/**
 * Имена переменных Figma становятся именами CSS-переменных, поэтому всё, что не является
 * допустимым символом CSS-идентификатора, удаляется: Figma разрешает в имени `!`, `%`,
 * `(`, пробелы и прочее (например, `brandMarine/800!`).
 */
const kebab = (segment) =>
  String(segment)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_.]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()

const isToken = (node) =>
  node !== null &&
  typeof node === 'object' &&
  !Array.isArray(node) &&
  ('$value' in node || 'value' in node)

/** `{color.brand.primary}` -> `color-brand-primary` */
const aliasTarget = (raw) =>
  typeof raw === 'string' && /^\{[^{}]+\}$/.test(raw.trim())
    ? raw.trim().slice(1, -1).split('.').map(kebab).join('-')
    : null

function formatScalar(value, type) {
  if (typeof value === 'number') {
    return LENGTH_TYPES.has(type) && value !== 0 ? `${value}px` : String(value)
  }

  if (value && typeof value === 'object' && 'unit' in value && 'value' in value) {
    return `${value.value}${value.unit}`
  }
  return String(value).trim()
}

function formatShadow(value) {
  const layers = Array.isArray(value) ? value : [value]
  return layers
    .map((layer) => {
      const parts = [
        layer.inset || layer.type === 'innerShadow' ? 'inset' : null,
        formatScalar(layer.offsetX ?? layer.x ?? 0, 'dimension'),
        formatScalar(layer.offsetY ?? layer.y ?? 0, 'dimension'),
        formatScalar(layer.blur ?? 0, 'dimension'),
        formatScalar(layer.spread ?? 0, 'dimension'),
        layer.color,
      ]
      return parts.filter(Boolean).join(' ')
    })
    .join(', ')
}

function flatten(node, trail, out, inheritedType) {
  if (isToken(node)) {
    const name = trail.map(kebab).join('-')
    const type = node.$type ?? node.type ?? inheritedType
    const value = node.$value ?? node.value

    if (value === '' || value === null || value === undefined) {
      console.warn(`  ! пропущен \`${name}\`: пустое значение`)
      return
    }

    if (type === 'shadow' || type === 'boxShadow') {
      out.push({ name, value: formatShadow(value) })
      return
    }
    // Составные токены (типографика, границы, ...) разворачиваются в токен на каждое свойство.
    if (value && typeof value === 'object' && !Array.isArray(value) && !('unit' in value)) {
      for (const [key, sub] of Object.entries(value)) {
        out.push({ name: `${name}-${kebab(key)}`, value: formatScalar(sub, key) })
      }
      return
    }
    out.push({ name, value: formatScalar(value, type) })
    return
  }

  if (node && typeof node === 'object' && !Array.isArray(node)) {
    const groupType = node.$type ?? node.type ?? inheritedType
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith('$')) continue
      flatten(child, [...trail, key], out, groupType)
    }
  }
}


function modeOf(filename) {
  const stem = filename.replace(/\.tokens\.json$/i, '').replace(/\.json$/i, '')
  const parts = stem.split('.')
  return parts.length > 1 ? kebab(parts.at(-1)) : null
}

/**
 * Выводит CSS-переменные одного режима.
 *
 * - без режима / базовый брейкпоинт -> обычный `:root`
 * - имя брейкпоинта                 -> `@media (min-width: ...) { :root { ... } }`
 * - всё остальное                   -> `[data-theme='<режим>']`
 */
function renderMode(mode, tokens, breakpoints) {
  const declarations = [...tokens].map(([name, value]) => `  --${name}: ${value};`).join('\n')
  const width = mode === null ? null : breakpoints.get(mode)

  if (width && width !== '0') {
    const indented = declarations.replace(/^/gm, '  ')
    return `\n@media (min-width: ${width}) {\n  :root {\n${indented}\n  }\n}\n`
  }


  const selector =
    mode === null || breakpoints.has(mode)
      ? ':root'
      : `:root[data-theme='${mode}'], [data-theme='${mode}']`

  return `\n${selector} {\n${declarations}\n}\n`
}


function sortModes(modes, breakpoints) {
  const order = [...breakpoints.keys()]
  const rank = (mode) => {
    if (mode === null) return 0
    const index = order.indexOf(mode)
    return index >= 0 ? 1 + index : 1 + order.length
  }

  return [...modes].sort(
    (a, b) => rank(a) - rank(b) || String(a).localeCompare(String(b)),
  )
}


function sassValue(value) {
  let depth = 0
  let quote = null

  for (const char of value) {
    if (quote) {
      if (char === quote) quote = null
      continue
    }
    if (char === '"' || char === "'") quote = char
    else if (char === '(' || char === '[') depth += 1
    else if (char === ')' || char === ']') depth -= 1
    else if (char === ',' && depth === 0) return `(${value})`
  }

  return value
}


function resolveLiteral(name, literals, seen = new Set()) {
  const value = literals.get(name)
  if (value === undefined) return null
  const target = value.startsWith('var(--') ? value.slice(6, value.indexOf(')')) : null
  if (!target) return value
  if (seen.has(name)) {
    console.warn(`  ! циклический алиас в "${name}"`)
    return value
  }
  seen.add(name)
  return resolveLiteral(target, literals, seen) ?? value
}

async function main() {
  if (!existsSync(tokensDir)) await mkdir(tokensDir, { recursive: true })
  await mkdir(outDir, { recursive: true })

  const files = (await readdir(tokensDir)).filter((f) => f.toLowerCase().endsWith('.json')).sort()


  const byMode = new Map()

  for (const file of files) {
    const raw = await readFile(path.join(tokensDir, file), 'utf8')
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
    console.log(`  + ${file} -> ${entries.length} токенов${mode ? ` [${mode}]` : ''}`)
  }

  const breakpoints = await readBreakpoints()
  const modes = sortModes(byMode.keys(), breakpoints)

  let css = BANNER
  if (modes.length === 0) {
    css += '\n// В tokens/ нет ни одного файла. Положите туда выгрузку из Figma и запустите снова.\n'
  }
  for (const mode of modes) {
    css += renderMode(mode, byMode.get(mode), breakpoints)
  }
  await writeFile(path.join(outDir, '_css-vars.scss'), css, 'utf8')

  const baseMode = [...breakpoints].find(([, width]) => width === '0')?.[0]
  const literals = new Map([...(byMode.get(null) ?? []), ...(byMode.get(baseMode) ?? [])])
  const resolved = [...literals.keys()].map((name) => [
    name,
    resolveLiteral(name, literals) ?? literals.get(name),
  ])

  let scss = BANNER
  if (resolved.length === 0) {
    scss += '\n// В tokens/ нет ни одного файла. Положите туда выгрузку из Figma и запустите снова.\n\n$tokens: ();\n'
  } else {
    scss +=
      '\n// Литеральные значения токенов — для использования на этапе Sass (вычисления, цвет, медиа).\n' +
      '// В компонентах используйте CSS-переменную напрямую — `padding: var(--spacing-16)` —\n' +
      '// тогда переопределения по брейкпоинтам и темам работают в рантайме.\n'
    scss += '\n$tokens: (\n'
    for (const [name, value] of resolved) scss += `  '${name}': ${sassValue(value)},\n`
    scss += ');\n\n'
    for (const [name, value] of resolved) scss += `$token-${name}: ${sassValue(value)};\n`
  }
  await writeFile(path.join(outDir, '_variables.scss'), scss, 'utf8')

  const total = [...byMode.values()].reduce((sum, bucket) => sum + bucket.size, 0)
  console.log(`\n  ${total} токенов, режимов: ${modes.length} -> app/shared/styles/tokens/`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
