import {TEMPLATE_PATH} from "./constants.js";

class CompendiumExplorerSidebar {
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

  applyFilter = async(formData, directoryItem) => {
    const documentId = directoryItem.dataset.documentId
    const document = await this.compendium.getDocument(documentId)
    let result = true
    for (const data of formData) {
      if (!data.value) continue
      const itemValue = getProperty(document, data.name) || ""
      if (getType(itemValue) === "string") {
        result = result && itemValue.localeCompare(data.value, game.i18n.lang, {
          sensitivity: 'base'
        }) === 0
      } else if (getType(itemValue) === "number") {
        result = result && itemValue === Number(data.value)
      }  else if (getType(itemValue) === "boolean") {
        result = result && itemValue === (data.value === 'on')
      }else {
          result = result && itemValue === data.value
      }
    }
    return result
  }

  _handleFilter = async () => {
    const directoryItems = this.html.find(".directory-list .directory-item:not(.compendium-folder):not(.hidden)")
    const formData = $("#compendium-explorer").serializeArray()
    const results = await Promise.all(directoryItems.map((_, directoryItem) => this.applyFilter(formData, directoryItem)))
    directoryItems.css({ display: "none"}).filter((index, directoryItem) => {
      return results[index]
    }).css({display: "flex"})
  }

  _handleClear = async () => {
    const directoryItems = this.html.find(".directory-list > .directory-item:not(.compendium-folder):not(.hidden)")
    directoryItems.css({display: "flex"})
  }

  cleanTemplateContainer = () => {
    const width = parseFloat(this.html.closest(".app").css("width"))
    this.html.closest(".app").css({
      width: `${width + this.metadata.width}px`
    })

    this.html.closest(".app").find('.window-content').addClass('compendium-explorer__window-content')
  }

  getTemplateData = () => {
    const categories = Object.values(this.system.categories).filter(category => {
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
    if (this.compendium.documentName !== "Item") return
    if (this.html.closest(".app").find('#compendium-explorer').length > 0) return
    this.cleanTemplateContainer()
    const template = await renderTemplate(`${TEMPLATE_PATH}/compendium-explorer.html`, this.getTemplateData())
    const $template = $(template)
    $template.find(".compendium-explorer__apply").on('click', this._handleFilter)
    $template.find(".compendium-explorer__clear").on('click', this._handleClear)
    const container = this.html.closest(".app").find('.compendium.directory')
    container.find(".directory-list").addClass('compendium-explorer__directory-list')
    $template.insertBefore(container);
  }
}

export default CompendiumExplorerSidebar
