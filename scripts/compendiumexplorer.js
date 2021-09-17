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

Hooks.on("renderCompendium", async (app, html, data) => {
  const compendiumExplorerFilter = new CompendiumExplorerSidebar({
    system: await getSystemSettings(),
    app,
    data,
    html
  })
  await compendiumExplorerFilter.render()
})
