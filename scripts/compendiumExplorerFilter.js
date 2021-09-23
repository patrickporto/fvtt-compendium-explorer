class CompendiumExplorerFilter {
  constructor({directoryItems, compendium, system}) {
    this.directoryItems = directoryItems
    this.compendium = compendium
    this.system = system
  }

  _handleDirectoryItem = async (formData, directoryItem) => {
    const documentId = directoryItem.dataset.documentId
    const document = await this.compendium.getDocument(documentId)
    return formData.reduce((result, data) => {
      if (!data.value || data.name.startsWith('$modifier__') || data.name.startsWith('$type__')) return result
      const getItemValue = () => {
        if (data.name.startsWith('$derivedFields')) {
          const field = data.name.split('.')[1]
          const fieldFn = this.system.derivedFields[field]
          return fieldFn(document)
        }
        return getProperty(document, data.name) || ""
      }
      const itemValue = getItemValue()
      const filterType = formData.find(filterType => filterType.name === `$type__${data.name}`)?.value || getType(itemValue)
      const modifier = formData.find(filterModifier => filterModifier.name === `$modifier__${data.name}`)?.value

      if (filterType === "string") {
        return result && itemValue.localeCompare(data.value, game.i18n.lang, {
          sensitivity: 'base'
        }) === 0
      }
      if (filterType === "number") {
        if (modifier === '=') {
          return result && Number(itemValue) === Number(data.value)
        }
        if (modifier === '>=') {
          return result && Number(itemValue) >= Number(data.value)
        }
        if (modifier === '<=') {
          return result && Number(itemValue) <= Number(data.value)
        }
        if (modifier === '>') {
          return result && Number(itemValue) > Number(data.value)
        }
        if (modifier === '<') {
          return result && Number(itemValue) < Number(data.value)
        }
        if (modifier === '<>') {
          return result && Number(itemValue) !== Number(data.value)
        }
      }
      if (['boolean', 'check'].includes(filterType)) {
        return result && itemValue === (data.value === 'on')
      }
      if (Array.isArray(itemValue)) {
        return result && itemValue.includes(data.value)
      }
      return result && itemValue === data.value
    })
}

  async apply(formData) {
    const results = await Promise.all(this.directoryItems.map((_, directoryItem) => this._handleDirectoryItem(formData, directoryItem)))
    this.directoryItems.css({ display: "none"}).filter((index, directoryItem) => {
      return results[index]
    }).css({display: "flex"})
  }

  async clear() {
    this.directoryItems.css({display: "flex"})
  }
}


export default CompendiumExplorerFilter
