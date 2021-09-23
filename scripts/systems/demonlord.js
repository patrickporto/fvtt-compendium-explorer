import {createSystemSettings} from "../systemSettings.js";

const system = {
  categories: {
    spell: {
      label: "ITEM.TypeSpell",
      templateTypes: ['spell'],
      documentTypes: ['item'],
      filters: {
        tradition: {
          label: "DL.MagicTradition",
          field: "data.data.tradition",
        },
        rank: {
          label: "DL.SpellRank",
          field: "data.data.rank",
          type: "number"
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
      documentTypes: ['item'],
      filters: [
        {
          label: "DL.ItemValue",
          field: "data.data.value"
        }
      ]
    },
    creature: {
      label: "Creature",
      templateTypes: ['creature'],
      documentTypes: ['actor'],
      filters: [
        {
          label: "DL.CreatureDifficulty",
          field: "data.data.difficulty",
          type: "number"
        },
        {
          label: "DL.CreatureHorrifying",
          field: "data.data.horrifying",
          type: "check"
        },
        {
          label: "DL.CreatureFrightening",
          field: "data.data.frightening",
          type: "check"
        },
      ]
    },
  },
  lookupFields: {
    tradition: 'data.data.tradition'
  }
}

export default createSystemSettings(system)
