import { fileURLToPath } from "node:url"

/** Корень исходников — он же srcDir для Nuxt. */
export const srcDir = fileURLToPath(new URL("../app", import.meta.url))

const injectAbstracts = (source: string, filename: string) => {
  const normalized = filename.replaceAll("\\", "/")
  if (
    normalized.includes("/shared/styles/") ||
    normalized.includes("/app/styles/")
  ) {
    return source
  }

  return `@use "shared/styles/abstracts" as *;\n${source}`
}

export const scssPreprocessorOptions = {
  additionalData: injectAbstracts,
  // Позволяет писать `@use "shared/styles/..."` из любого файла.
  loadPaths: [srcDir],
}

/** Алиасы слоёв FSD. */
export const fsdAliases = {
  "@app": srcDir,
  "@entities": `${srcDir}/entities`,
  "@features": `${srcDir}/features`,
  "@pages": `${srcDir}/pages`,
  "@shared": `${srcDir}/shared`,
  "@widgets": `${srcDir}/widgets`,
}
