import CompendiumExplorerSidebar from "./compendiumExplorerSidebar.js";
import {SYSTEM_PATH} from "./constants.js";

const getSystemSettings = async () => {
  try {
    const system = await import(`${SYSTEM_PATH}/${game.system.id}.js`)
    return system.default;
  } catch (e) {
    const system = await import(`${SYSTEM_PATH}/generic.js`)
    return system.default
  }
}

Hooks.on("init", () => {
  Handlebars.registerHelper('ifEquals', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
})

Hooks.on("renderCompendium", async (app, html, data) => {
  const compendiumExplorerFilter = new CompendiumExplorerSidebar({
    system: await getSystemSettings(),
    app,
    data,
    html
  })
  await compendiumExplorerFilter.render()
})
