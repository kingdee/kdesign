interface Meta {
  // true 不展示
  skip?: boolean
  // 类别
  category?: any
  // 子类
  type?: any
  title?: any
  subtitle?: any
  // 排序
  order?: number
  filename?: string
  children?: Meta[]
  // 隐藏锚点
  hiddenAnchor?: boolean
}

interface ModuleDataItem {
  meta: Meta
}

interface Orders {
  [key: string]: number
}

type sortFn = (a: Meta, b: Meta) => number

export function getMenuItems(moduleData: ModuleDataItem[], categoryOrder: Orders, typeOrder: Orders) {
  const menuMeta = moduleData.map((item) => item.meta).filter((meta) => !meta.skip)

  const menuItems: Meta[] = []
  const sortByOrderFn = (a: Meta, b: Meta) => (a.order || 0) - (b.order || 0)
  const sortByTitleFn = (a: Meta, b: Meta) => {
    const sortA = a?.title.toLocaleLowerCase()
    const sortB = b?.title.toLocaleLowerCase()
    if (sortA > sortB) return +1
    if (sortA < sortB) return -1
    return 0
  }
  menuMeta.forEach((meta) => {
    if (!meta.category) {
      menuItems.push(meta)
      return
    }

    // Component
    if (meta.category === 'Components' && meta.type) {
      let type = menuItems.find((i) => i.title === meta.type)
      if (!type) {
        type = {
          type: 'type',
          title: meta.type,
          children: [],
          order: typeOrder[meta.type],
        }
        menuItems.push(type)
      }
      type.children = type.children || []
      type.children.push(meta)
      return
    }

    let group = menuItems.find((i) => i.title === meta.category)

    if (!group) {
      group = {
        type: 'category',
        title: meta.category,
        children: [],
        order: categoryOrder[meta.category],
      }
      menuItems.push(group)
    }

    group.children = group.children || []

    if (meta.type) {
      let type = group.children.filter((i) => i.title === meta.type)[0]
      if (!type) {
        type = {
          type: 'type',
          title: meta.type,
          children: [],
          order: typeOrder[meta.type],
        }
        group.children.push(type)
      }
      type.children = type.children || []
      type.children.push(meta)
    } else {
      group.children.push(meta)
    }
  })

  function nestSort(list: Meta[], sortFn: sortFn): Meta[] {
    return list.sort(sortFn).map((item) => {
      if (item.children) {
        return {
          ...item,
          children: nestSort(item.children, sortByTitleFn),
        }
      }

      return item
    })
  }

  return nestSort(menuItems, sortByOrderFn)
}
