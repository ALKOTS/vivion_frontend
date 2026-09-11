/** Товар в том виде, в каком его показывает карточка листинга. */
export interface Product {
  /** Идентификатор товара; из него собирается ссылка `/products/:id`. */
  id: string
  /** Путь к фото товара для `<NuxtImg>`. */
  img?: string
  /** Металлы, в которых доступен товар; рисуются кружками в карточке. */
  materials?: ProductMaterial[]
  /** Название товара. */
  name?: string
  /** Цена строкой, уже отформатированная, например `от 166 350 ₽`. */
  price?: string
  /** Тип изделия, например `Помолвочное кольцо`. */
  productType?: string
  /** Бренд для плашки в углу карточки. */
  trademark?: string
}

/** Металл, в котором доступен товар. */
export type ProductMaterial = "platinum" | "rose" | "white" | "yellow"
