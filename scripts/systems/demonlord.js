import {createSystemSettings} from "../systemSettings.js";

const system = {
  categories: {
    spell: {
      label: "ITEM.TypeSpell",
      templateTypes: ['spell'],
      filters: {
        tradition: {
          label: "DL.MagicTradition",
          field: "data.data.tradition",
        },
        rank: {
          label: "DL.SpellRank",
          field: "data.data.rank"
        },
        spellType: {
          label: "DL.SpellType",
          field: "data.data.spelltype",
          choices: [
            {
              label: "DL.SpellTypeAttack",
              value: "Attack"
            },
            {
              label: "DL.SpellTypeUtility",
              value: "Utility"
            }
          ]
        },
        attribute: {
          label: "DL.SpellAttribute",
          field: "data.data.attribute",
          choices: [
            {
              label: "DL.AttributeIntellect",
              value: "Intellect"
            },
            {
              label: "DL.AttributeWill",
              value: "Will"
            }
          ]
        },
      }
    },
    equipment: {
      label: "Equipment",
      templateTypes: ['weapon', 'item', 'armor', 'ammo'],
      filters: [
        {
          label: "DL.ItemValue",
          field: "data.data.value",
          type: "Number"
        }
      ]
    },
  }
}

export default createSystemSettings(system)
