import {createSystemSettings} from "../systemSettings.js";

const configToChoices = obj => Object.entries(obj).map(([key, value]) => ({"label": value, "value": key}))

const system = {
  categories: {
    items: {
      filters: {
        actionType: {
          label: 'DND5E.ItemActionType',
          field: "data.data.actionType",
          choices: configToChoices(CONFIG.DND5E.itemActionTypes)
        },
        damageTypes: {
          label: 'DND5E.Damage',
          field: "$derivedFields.damageTypes",
          choices: configToChoices(CONFIG.DND5E.damageTypes)
        }
      }
    },
    spell: {
      label: "ITEM.TypeSpell",
      documentTypes: ['item'],
      templateTypes: ['spell'],
      filters: {
        level: {
          label: "DND5E.SpellLevel",
          field: "data.data.level",
          choices: [
            {label: "DND5E.SpellLevel0", value: 0},
            {label: "DND5E.SpellLevel1", value: 1},
            {label: "DND5E.SpellLevel2", value: 2},
            {label: "DND5E.SpellLevel3", value: 3},
            {label: "DND5E.SpellLevel4", value: 4},
            {label: "DND5E.SpellLevel5", value: 5},
            {label: "DND5E.SpellLevel6", value: 6},
            {label: "DND5E.SpellLevel7", value: 7},
            {label: "DND5E.SpellLevel8", value: 8},
            {label: "DND5E.SpellLevel9", value: 9},
          ],
        },
        school: {
          label: "DND5E.SpellSchool",
          field: "data.data.school",
          choices: configToChoices(CONFIG.DND5E.spellSchools),
        },
      }
    },
    spellComponents: {
      label: "DND5E.SpellComponents",
      documentTypes: ['item'],
      templateTypes: ['spell'],
      filters: {
        verbal: {
          label: "DND5E.ComponentVerbal",
          field: "data.data.components.vocal",
          type: "check",
        },
        somatic: {
          label: "DND5E.ComponentSomatic",
          field: "data.data.components.somatic",
          type: "check",
        },
        material: {
          label: "DND5E.ComponentMaterial",
          field: "data.data.components.material",
          type: "check",
        },
        concentration: {
          label: "DND5E.Concentration",
          field: "data.data.components.concentration",
          type: "check",
        },
        ritual: {
          label: "DND5E.Ritual",
          field: "data.data.components.ritual",
          type: "check",
        },
      }
    },
    equipments: {
      label: "ITEM.TypeEquipment",
      documentTypes: ['item'],
      templateTypes: ['equipment'],
      filters:{
        price: {
          label: "DND5E.Price",
          field: "data.data.price",
        }
      }
    },
    weapon: {
      label: "ITEM.TypeWeapon",
      documentTypes: ['item'],
      templateTypes: ['weapon'],
      filters:{
        price: {
          label: "DND5E.ItemWeaponType",
          field: "data.data.weaponType",
          choices: [
            {label: "DND5E.WeaponSimpleM", value: "simpleM"},
            {label: "DND5E.WeaponSimpleR", value: "simpleR"},
            {label: "DND5E.WeaponMartialM", value: "martialM"},
            {label: "DND5E.WeaponMartialR", value: "martialR"},
            {label: "DND5E.WeaponNatural", value: "natural"},
            {label: "DND5E.WeaponImprov", value: "improv"},
            {label: "DND5E.WeaponSiege", value: "siege"}
          ],
        }
      }
    },
    npc: {
      label: "ACTOR.TypeNpc",
      documentTypes: ['actor'],
      templateTypes: ['npc'],
      filters:{
        size: {
          label: "DND5E.Size",
          field: "data.data.traits.size",
          choices: configToChoices(CONFIG.DND5E.actorSizes),
        },
        cr: {
          label: "DND5E.AbbreviationCR",
          field: "data.data.details.cr",
          type: "number"
        }
      }
    }
  },
  derivedFields: {
    damageTypes: (document) => {
      return document.data.data.damage.parts.map(part => part[1])
    }
  }
}

export default createSystemSettings(system)
