import createESLintConfig from "@exer7um/eslint-config"

// tailwindcss отключён: в проекте SCSS с дизайн-токенами, Tailwind не используется
const config = await createESLintConfig({ plugins: { tailwindcss: false } })

export default [
  {
    ignores: [
      "tokens/**",
      "scripts/build-tokens.mjs",
      "nuxt.config.ts",
      "app/shared/styles/tokens/_css-vars.scss",
      "app/shared/styles/tokens/_variables.scss",
    ],
  },
  ...config,
]
