import type { MaybeRefOrGetter } from "vue"

import type { QuickFilter } from "~/entities/quick-filter/model/types"

/**
 * Фильтр каталога по быстрому фильтру.
 *
 * @template T Тип полки; достаточно `id` и `products`.
 * @param options Быстрые фильтры и полки страницы.
 * @param options.filters Быстрые фильтры, показанные на странице.
 * @param options.shelves Полки товаров; фильтр без непустой полки выключается.
 * @returns Выбранный фильтр, выключенные фильтры, видимые полки и `select`.
 * @example
 * const { disabledIds, selected, select, visibleShelves } = useCatalogFilter({
 *   filters,
 *   shelves,
 * })
 */
export function useCatalogFilter<T extends FilterableShelf>(options: {
  filters: MaybeRefOrGetter<QuickFilter[]>
  shelves: MaybeRefOrGetter<T[]>
}) {
  const route = useRoute()
  const router = useRouter()

  const availableIds = computed(
    () =>
      new Set(
        toValue(options.shelves)
          .filter(({ products }) => products?.length)
          .map(({ id }) => id),
      ),
  )

  const selected = computed(() => {
    const raw = route.query[CATALOG_FILTER_QUERY]

    return typeof raw === "string" && availableIds.value.has(raw)
      ? raw
      : ALL_FILTER_ID
  })

  const disabledIds = computed(() =>
    toValue(options.filters)
      .filter(({ id }) => id !== ALL_FILTER_ID && !availableIds.value.has(id))
      .map(({ id }) => id),
  )

  const visibleShelves = computed(() =>
    selected.value === ALL_FILTER_ID
      ? toValue(options.shelves)
      : toValue(options.shelves).filter(({ id }) => id === selected.value),
  )

  /**
   * Выбирает фильтр: записывает его в адрес; «Смотреть всё» убирает параметр.
   *
   * @param id Идентификатор фильтра.
   * @returns Промис навигации.
   */
  const select = (id: string) =>
    router.push({
      query: {
        ...route.query,
        [CATALOG_FILTER_QUERY]: id === ALL_FILTER_ID ? undefined : id,
      },
    })

  return { disabledIds, select, selected, visibleShelves }
}
