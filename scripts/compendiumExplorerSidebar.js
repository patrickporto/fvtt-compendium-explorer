import {TEMPLATE_PATH} from "./constants.js";
import CompendiumExplorerFilter from "./compendiumExplorerFilter.js";
import LookupField from "./lookupField.js";

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

  _handleFilter = async () => {
    const directoryItems = this.html.find(".directory-list .directory-item:not(.compendium-folder):not(.hidden)")
    const formData = $("#compendium-explorer").serializeArray()
    const compendiumExplorerFilter = new CompendiumExplorerFilter({
      directoryItems,
      compendium: this.compendium,
      system: this.system
    })
    await compendiumExplorerFilter.apply(formData)
  }

  _handleClear = async () => {
    const directoryItems = this.html.find(".directory-list .directory-item:not(.compendium-folder):not(.hidden)")
    const compendiumExplorerFilter = new CompendiumExplorerFilter({directoryItems})
    await compendiumExplorerFilter.clear()
  }

  cleanTemplateContainer = () => {
    const width = parseFloat(this.html.closest(".app").css("width"))
    this.html.closest(".app").css({
      width: `${width + this.metadata.width}px`
    })

    this.html.closest(".app").find('.window-content').addClass('compendium-explorer__window-content')
  }

  getTemplateData = async () => {
    const categories = Object.values(this.system.categories).filter(category => {
      const hasTemplateType = category?.templateTypes?.reduce((result, type) => {
        return result && this.compendiumTypes.has(type)
      }, true) ?? true
      const hasDocumentType = category?.documentTypes?.includes(this.compendium.documentName.toLowerCase()) ?? false
      return hasTemplateType && hasDocumentType
    })
    const compendiumContent = await this.compendium.getContent()
    const lookupFields = Object.values(this.system.lookupFields).reduce((fields, field) => {
        const lookupField = new LookupField(compendiumContent, field)
        fields[field] = lookupField.getValues()
        return fields
      }, {})
    return {
      categories,
      lookupFields
    }
  }

  async render() {
    // if (this.compendium.documentName !== "Item") return
    if (this.html.closest(".app").find('#compendium-explorer').length > 0) return
    this.cleanTemplateContainer()
    const templateData = await this.getTemplateData()
    const template = await renderTemplate(`${TEMPLATE_PATH}/compendium-explorer.html`, templateData)
    const $template = $(template)
    $template.find(".compendium-explorer__apply").on('click', this._handleFilter)
    $template.find(".compendium-explorer__clear").on('click', this._handleClear)
    const container = this.html.closest(".app").find('.compendium.directory')
    container.find(".directory-list").addClass('compendium-explorer__directory-list')
    $template.insertBefore(container);
  }
}

export default CompendiumExplorerSidebar
