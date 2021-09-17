import {TEMPLATE_PATH} from "./constants.js";

class CompendiumExplorerFilter {
  metadata = {
    width: 320,
  }

  constructor({
    app,
    data,
    html,
    system,
  }) {
    this.system = system
    this.app = app
    this.data = data
    this.html = html
    this.compendium = game.packs.get(this.data.collection.collection)
    this.compendiumTypes = new Set(Array.from(this.compendium.index).map(item => item.type))
  }

  _userCanView() {
    return game.user.isGM
  }

  isFiltered = async(formData, directoryItem) => {
    const documentId = directoryItem.dataset.documentId
    const document = await this.compendium.getDocument(documentId)
    let result = true
    for (const data of formData) {
      if (!data.value) continue
      const itemValue = getProperty(document, data.name) || ""
      result = result && itemValue.localeCompare(data.value, game.i18n.lang, {
        sensitivity: 'base'
      }) === 0
    }
    return result
  }

  _handleFilter = async () => {
    const directoryItems = this.html.find(".directory-list .directory-item:not(.compendium-folder):not(.hidden)")
    const formData = $("#compendium-filter").serializeArray()
    const results = await Promise.all(directoryItems.map((_, directoryItem) => this.isFiltered(formData, directoryItem)))
    directoryItems.css({ display: "none"}).filter((index, directoryItem) => {
      return results[index]
    }).css({display: "flex"})
  }

  _handleClear = async () => {
    const directoryItems = this.html.find(".directory-list > .directory-item")
    directoryItems.css({display: "flex"})
  }

  cleanTemplateContainer = () => {
    const width = parseFloat(this.html.closest(".app").css("width"))
    this.html.closest(".app").css({
      width: `${width + this.metadata.width}px`
    })

    this.html.closest(".app").find('.window-content').addClass('compendium-filter__window-content')
  }

  getTemplateData = () => {
    const categories = this.system.categories.filter(category => {
      if (!category.templateTypes) return true
      for (const type of category.templateTypes) {
        if (this.compendiumTypes.has(type)) {
          return true
        }
      }
      return false
    })
    return {
      categories,
    }
  }

  async render() {
    this.cleanTemplateContainer()
    if (this.html.closest(".app").find('#compendium-filter').length > 0) return
    const template = await renderTemplate(`${TEMPLATE_PATH}/compendium-filter.html`, this.getTemplateData())
    const $template = $(template)
    $template.find(".compendium-filter__apply").on('click', this._handleFilter)
    $template.find(".compendium-filter__clear").on('click', this._handleClear)
    $template.insertBefore(this.html.closest(".app").find('.compendium.directory'));
  }
}

export default CompendiumExplorerFilter
