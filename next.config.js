// next.config.js
const { PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    defaultConfig.eslint = {
      ignoreDuringBuilds: true,
    };
  }

  return defaultConfig;
};
