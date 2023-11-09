/* eslint-disable */
/**
 * Optimise SVGs from directory and create an SVG spriteSheet out of them.
 *
 * SVGs layers should be grouped and contain only simplified objects path.
 * https://jakearchibald.github.io/svgomg/ or https://icomoon.io/ would be
 * services to harmonize sizes and optimise the icons beforehand.
 */

const { optimize } = require('svgo');
const { loadConfig } = require('svgo');
// eslint-disable-next-line
const svgStore = require('svgstore');
const fs = require('fs');
const path = require('path');

const config = {
  // directory with icons
  src: '../src/static/icons',
  // directory to store spriteSheet
  dest: [
    '../public',
    '../docs/.vuepress/public',
  ],
  // temporally directory to store optimized icons (will be removed afterwards)
  tmp: '../_optimizedIcons',
  // name of created spriteSheet
  name: 'base-ui-icons.svg',
  // options for svgStore module
  svgStore: {
    svgAttrs: {
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink"
    },
    symbol: {
      symbolAttrs: {
        viewBox: '0 0 32 32'
      }
    }
  },
}

/**
 * Optimise SVGs from directory
 *
 * @param {Object} options
 * @returns {Promise<void>}
 */
const svgOptimise = async (options) => {
  // load config from ./svgo.config.js
  const config = await loadConfig();

  // define paths
  const src = path.join(__dirname, options.src);
  const dest = path.join(__dirname, options.tmp);

  // define counter
  let files = 0;

  // create directory
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // read files from directory, write optimised files
  fs.readdirSync(src).forEach((file) => {
    if (path.extname(file) !== '.svg') return;

    const svg = fs.readFileSync(`${src}/${file}`, 'utf8');
    const result = optimize(svg, config);
    fs.writeFileSync(`${dest}/${file}`, result.data);
    files += 1;
  });

  // inform user
  console.info(`${files} SVG file(s) have been optimised.`);
}

/**
 * build SVG SpriteSheet
 *
 * @param {Object} options
 */
const svgSprite = (options) => {
  // define paths
  const src = path.join(__dirname, options.tmp);

  // init sprite object
  let sprite = svgStore(options.svgStore.svgAttrs);

  // read files from directory, add files as symbols
  fs.readdirSync(src).forEach((file) => {
    // allow .svg files, otherwise do nothing
    if (path.extname(file) !== '.svg') return;

    // remove file extension
    const id = file.slice(0, -4);

    // svg content
    const svg = fs.readFileSync(`${src}/${file}`, 'utf8');

    // add content to sprite
    sprite.add(id, svg, options.svgStore.symbol);
  });

  // remove xml tag
  sprite = /<svg(.+)/.exec(sprite)[0];

  // save file to destination(s)
  config.dest.forEach(dest => {
    const destPath = path.join(__dirname, dest);

    // create directory if needed
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
      // inform user
      console.info(`Path has been created: ${destPath}`);
    }

    // save svg sprite
    fs.writeFileSync(`${destPath}/${options.name}`, sprite);

    // inform user
    console.info(`SVG SpriteSheet has been created: ${destPath}/${options.name}`);
  });
}

/**
 * remove temporally directory
 *
 * @param options
 */
const cleanup = (options) => {
  const dir = path.join(__dirname, options.tmp);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

/**
 * optimise files and create spriteSheet
 */
const generateSvgSpriteSheet = () => {
  svgOptimise(config)
    .then(() => svgSprite(config))
    .then(() => cleanup(config));
}

generateSvgSpriteSheet();

module.exports = generateSvgSpriteSheet;
