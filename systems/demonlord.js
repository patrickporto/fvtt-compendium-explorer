const system = {
  categories: [
    {
      label: "General",
      filters: [
        {
          label: "Item Type",
          field: "data.type",
          choices: game.system.template.Item.types.map(itemType => ({
            label: `ITEM.Type${itemType.capitalize()}`,
            value: itemType
          }))
        }
      ]
    },
    {
      label: "Spell",
      templateTypes: ['spell'],
      filters: [
        {
          label: "Tradition",
          field: "data.data.tradition",
        }
      ]
    },
    {
      label: "Equipment",
      templateTypes: ['weapon', 'item', 'armor', 'ammo'],
      filters: [
        {
          label: "Price",
          field: "data.data.value",
          type: "Number"
        }
      ]
    },
  ]
}

export default system
