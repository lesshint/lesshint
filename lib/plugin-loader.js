'use strict';

const path = require('path');

module.exports = (plugin, optionsObject) => {
    // An already instantiated object, return it directly
    if (typeof plugin !== 'string') {
        return plugin;
    }

    let pluginPath;

    try {
        // Try to find it somewhere on disk, relative to the current process
        pluginPath = require.resolve(path.join(process.cwd(), plugin));
    } catch (e) {
        try {
            // Try to load it as a module
            pluginPath = require.resolve(plugin);
        } catch (e) {
            // Try to find on on disk, relative to the config file in use
            const pathBasedOnConfig = optionsObject.configPath.replace('.lesshintrc', plugin);

            pluginPath = require.resolve(pathBasedOnConfig);
        }
    }

    return require(pluginPath);
};
