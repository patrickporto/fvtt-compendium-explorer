class LookupField {
  constructor(compendiumContent, field) {
    this.compendiumContent = compendiumContent
    this.field = field
  }

  getValues() {
    const items = this.compendiumContent

    return Array.from(new Set(items.map(item => getProperty(item, this.field)).filter(Boolean))).sort()
  }
}

export default LookupField
