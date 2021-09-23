const defaultSystemSettings = {
  categories: {
    general: {
      label: "COMPENDIUMEXPLORER.General",
      filters: {
        itemType: {
          label: "Item Type",
          field: "data.type",
          choices: game.system.template.Item.types.map(itemType => ({
            label: `ITEM.Type${itemType.capitalize()}`,
            value: itemType
          }))
        }
      }
    },
  },
  lookupFields: {}
}

export const createSystemSettings = (systemSettings) => {
  return mergeObject(defaultSystemSettings, systemSettings, {recursive: true})
}
