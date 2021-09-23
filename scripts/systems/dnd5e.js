import {createSystemSettings} from "../systemSettings.js";

const system = {
  categories: {
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
          choices: [
            {label: "DND5E.SchoolAbj", value: "abj"},
            {label: "DND5E.SchoolCon", value: "con"},
            {label: "DND5E.SchoolDiv", value: "div"},
            {label: "DND5E.SchoolEnc", value: "enc"},
            {label: "DND5E.SchoolEvo", value: "evo"},
            {label: "DND5E.SchoolIll", value: "ill"},
            {label: "DND5E.SchoolNec", value: "nec"},
            {label: "DND5E.SchoolTrs", value: "trs"}
          ],
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
    }
  }
}

export default createSystemSettings(system)
