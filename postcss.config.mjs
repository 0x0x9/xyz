import tailwindcssPostcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [tailwindcssPostcss, autoprefixer],
};

export default config;
