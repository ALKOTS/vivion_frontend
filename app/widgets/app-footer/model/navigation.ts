/** Ссылка в подвале. */
export interface AppFooterLink {
  label: string
  to: string
}

/** Блок подвала. */
export type AppFooterNavGroup =
  | { links: AppFooterLink[]; title: string }
  | { socials: AppFooterSocialLink[]; title: string }

/** Ссылка на соцсеть. */
export interface AppFooterSocialLink {
  href: string
  icon: string
  label: string
}

/** Колонки навигации подвала. */
export const appFooterNavigation: AppFooterNavGroup[][] = [
  [
    {
      links: [
        { label: "Заказ и оплата", to: "#" },
        { label: "Доставка", to: "#" },
        { label: "Политика возврата", to: "#" },
        { label: "Документы при покупке", to: "#" },
        { label: "Юридическая информация", to: "#" },
        { label: "FAQ", to: "#" },
      ],
      title: "Покупателям",
    },
  ],
  [
    {
      links: [
        { label: "О компании", to: "#" },
        { label: "История Дома LA VIVION", to: "#" },
        { label: "Бриллианты LA VIVION", to: "#" },
        { label: "Новости", to: "#" },
        { label: "СМИ о нас", to: "#" },
        { label: "Корпоративный портал", to: "#" },
      ],
      title: "О бренде LA VIVION",
    },
  ],
  [
    {
      links: [
        { label: "Клиентский сервис", to: "#" },
        { label: "Регистрация украшений", to: "#" },
      ],
      title: "Сервис",
    },
    {
      links: [
        { label: "Академия LA VIVION", to: "#" },
        { label: "Происхождение бриллиантов", to: "#" },
        { label: "Статьи", to: "#" },
      ],
      title: "Экспертиза",
    },
  ],
  [
    {
      socials: [
        { href: "#", icon: "icons:social-max", label: "Max" },
        { href: "#", icon: "icons:social-pinterest", label: "Pinterest" },
        { href: "#", icon: "icons:social-yandex-rhythm", label: "Яндекс Ритм" },
        { href: "#", icon: "icons:social-telegram", label: "Telegram" },
        { href: "#", icon: "icons:social-vk", label: "ВКонтакте" },
      ],
      title: "Мы в соцсетях",
    },
    {
      links: [
        { label: "Москва, Каланчевская улица, 16/1", to: "#" },
        { label: "+7 (495) 141-14-67", to: "tel:+74951411467" },
      ],
      title: "Контакты",
    },
  ],
]

/** Юридические ссылки. */
export const appFooterLegalLinks = {
  privacyPolicy: { label: "Политика конфиденциальности", to: "#" },
  termsOfUse: { label: "Пользовательское соглашение", to: "#" },
} satisfies Record<string, AppFooterLink>
