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
      qHd: '2000px',
    },
  },
  plugins: [require('daisyui')],
};
