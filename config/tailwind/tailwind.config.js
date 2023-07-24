'use strict';
// located in <app root>/config/tailwind/

const path = require('path');

const appRoot = path.join(__dirname, '../../');
const appEntry = path.join(appRoot, 'app');
const relevantFilesGlob = '**/*.{html,js,ts,hbs,gjs,gts}';

module.exports = {
  content: [path.join(appEntry, relevantFilesGlob)],
  theme: {
    extend: {
      // colors: { olive: '#e9edc9' },
    },
    screens: {
      xl: '1280px',
      qHd: '2400px',
    },
  },
  plugins: [require('daisyui')],
};
