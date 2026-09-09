import { fileURLToPath } from 'node:url'

/** Корень исходников — он же srcDir для Nuxt. */
export const srcDir = fileURLToPath(new URL('../app', import.meta.url))

const injectAbstracts = (source: string, filename: string) => {
  const normalized = filename.replace(/\\/g, '/')
  if (normalized.includes('/shared/styles/') || normalized.includes('/app/styles/')) {
    return source
  }

  return `@use "shared/styles/abstracts" as *;\n${source}`
}

export const scssPreprocessorOptions = {
  // Позволяет писать `@use "shared/styles/..."` из любого файла.
  loadPaths: [srcDir],
  additionalData: injectAbstracts,
}

/** Алиасы слоёв FSD. */
export const fsdAliases = {
  '@app': srcDir,
  '@pages': `${srcDir}/pages`,
  '@widgets': `${srcDir}/widgets`,
  '@features': `${srcDir}/features`,
  '@entities': `${srcDir}/entities`,
  '@shared': `${srcDir}/shared`,
}
