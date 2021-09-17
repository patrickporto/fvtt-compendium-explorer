import {createSystemSettings} from "../scripts/systemSettings.js";

const system = {
  categories: {
    spell: {
      label: "ITEM.TypeSpell",
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
    }
  }
}

export default createSystemSettings(system)
