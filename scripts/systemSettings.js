const defaultSystemSettings = {
  categories: {
    items: {
      label: "COMPENDIUMEXPLORER.Item",
      documentTypes: ['item'],
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
    actors: {
      label: "COMPENDIUMEXPLORER.Actor",
      documentTypes: ['actor'],
      filters: {
        itemType: {
          label: "Actor Type",
          field: "data.type",
          choices: game.system.template.Actor.types.map(itemType => ({
            label: `ACTOR.Type${itemType.capitalize()}`,
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
