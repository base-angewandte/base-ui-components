/**
 * Optimise SVGs from directory and create an SVG spriteSheet out of them.
 *
 * SVGs layers should be grouped and contain only simplified objects path.
 * https://jakearchibald.github.io/svgomg/ or https://icomoon.io/ would be
 * services to harmonize sizes and optimize the icons beforehand.
 */

const { optimize } = require('svgo');
const { loadConfig } = require('svgo');
const svgStore = require('svgstore');
const fs = require('fs');
const path = require('path');

const config = {
  // directory with icons
  src: '../src/static/icons',
  // directory to store spriteSheet
  dest: '../public',
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
  const dest = path.join(__dirname, options.dest);

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

  // create directory if needed
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // save svg sprite
  fs.writeFileSync(`${dest}/${options.name}`, sprite);

  // inform user
  console.info(`SVG SpriteSheet has been created: ${dest}/${options.name}`);
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
