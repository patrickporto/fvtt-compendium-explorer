import CompendiumExplorerFilter from "./compendiumExplorerFilter.js";
import {SYSTEM_PATH} from "./constants.js";

Hooks.once('init', async function() {

});

Hooks.on("renderCompendium", async (app, html, data) => {
  const system = await import(`${SYSTEM_PATH}/${game.system.id}.js`)
  const compendiumExplorerFilter = new CompendiumExplorerFilter({
    system: system.default,
    app,
    data,
    html
  })
  await compendiumExplorerFilter.render()
})
