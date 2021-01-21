const {src, dest, series, parallel} = require('gulp'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  inject = require('gulp-inject');

const {argv} = require('yargs');
const build_version = argv.build ? `.${argv.build}` : Math.round(Math.random() * 10000);
const need_counters = argv.counters

function getFontInfo(filepath) {
  const m = filepath.match(/(?<fontName>[^/\s]+)-(?<weightAndStyle>[^/\s]+)\.(?<ext>\w+)/);
  if (!m) {
    throw new Error(`Incrrect font file path: ${filepath}`);
  }

  const {fontName, weightAndStyle, ext} = m.groups;

  let family = '';
  for (i = 0; i < fontName.length; i += 1) {
    if (fontName[i] === fontName[i].toUpperCase() && family !== '') {
      family += ' ';
    }
    family += fontName[i];
  }

  let style = 'normal';
  let weight = 400;

  switch (weightAndStyle) {
    case 'Thin':
      weight = 100;
      break;
    case 'ThinItalic':
      weight = 100;
      style = 'italic';
      break;


    case 'ExtraLight':
      weight = 200;
      break;
    case 'ExtraLightItalic':
      weight = 200;
      style = 'italic';
      break;

    case 'Light':
      weight = 300;
      break;
    case 'LightItalic':
      weight = 300;
      style = 'italic';
      break;

    case 'Regular':
      break;
    case 'Italic':
      style = 'italic';
      break;

    case 'Medium':
      weight = 500;
      break;
    case 'MediumItalic':
      weight = 500;
      style = 'italic';
      break;
  
    case 'SemiBold':
      weight = 600;
      break;
    case 'SemiBoldItalic':
      weight = 600;
      style = 'italic';
      break;

    case 'Bold':
      weight = 700;
      break;
    case 'BoldItalic':
      weight = 700;
      style = 'italic';
      break;

    case 'ExtraBold':
      weight = 700;
      break;
    case 'ExtraBoldItalic':
      weight = 700;
      style = 'italic';
      break;

    case 'Black':
      weight = 900;
      break;
    case 'BlackItalic':
      weight = 900;
      style = 'italic';
      break;
  }

  let format;

  switch (ext) {
    case 'ttf':
      format = 'truetype';
      break;
    default:
      format = ext;
      break;
  }

  const url = `/fonts/${fontName}-${weightAndStyle}.${ext}`;

  return {family, weight, style, format, url};
}

function getFontFace(filepath, file) {
  let {family, style, weight, format, url} = getFontInfo(filepath);
  if (file.contents) {
    const content = file.contents.toString('base64');
    url = `data:font/opentype;base64,${content}`;
  }
  return [
    '@font-face {',
    `  font-family: "${family}";`,
    `  font-style: ${style};`,
    `  font-weight: ${weight};`,
    '  font-display: swap;',
    `  src: url("${url}") format('${format}');`,
    '}'
  ].map((line, index) => file.contents ? line : (index > 0 ? `  ${line}` : line)).join('\n') + '\n';
}

function injectFontsToScss() {
  return src('src/templates/fonts.scss')
    .pipe(inject(src('src/assets/fonts/*.*', {read: true}), {
      relative: true,
      transform: getFontFace,
    }))
    .pipe(dest('src/gens'));
}

function injectFontLinks() {
  return src('src/templates/fonts.pug')
    .pipe(inject(src('src/assets/fonts/*.*', {read: false}), {
      starttag: '<!-- inject:font-link -->',
      endtag: '<!-- endinject -->',
      transform: (filepath) => {
        const {url} = getFontInfo(filepath);
        return `link(rel="preload" href="${url}" as="font")`;
      },
    }))
    .pipe(dest('src/gens'));
}

function injectFontFaces() {
  return src('src/gens/fonts.pug')
    .pipe(inject(src('src/assets/fonts/*.*', {read: false}), {
      starttag: '/* inject:font-face */',
      endtag: '/* endinject */',
      transform: getFontFace,
    }))
    .pipe(dest('src/gens'));
}


function copyFonts() {
  return src('src/assets/fonts/*').pipe(dest('dist/fonts/'));
}

function injectComponentsPug() {
  return src('src/templates/components.pug')
    .pipe(inject(src('src/components/**/*.pug', {read: false}), {relative: true}))
    .pipe(dest('src/gens'));
}

function compilePug() {
  return src('src/pages/**/index.pug')
    .pipe(pug({
      pretty: true,
      locals: {build_version, need_counters},
    }))
    .pipe(dest(`dist/`));
}

function injectComponentsScss() {
  return src('src/templates/components.scss')
    .pipe(inject(src('src/components/**/*.scss', {read: false}), {relative: true}))
    .pipe(dest('src/gens/'));
}

function compileScss() {
  return src('src/assets/css/*.scss', '!src/assets/css/_*.scss')
    .pipe(sass())
    .pipe(dest('dist/css/'));
}

function copyImages() {
  return src('src/img/*')
      .pipe(dest('dist/img/'));
}

function componentsJs() {
  return src('src/components/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('components.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js/'));
}

function copyJs() {
  return src('src/js/*').pipe(dest('dist/js/'));
}

const html = series(injectComponentsPug, compilePug);
const injectFontsToPug = series(injectFontLinks, injectFontFaces);
const fonts = parallel(/*copyFonts, */injectFontsToPug, injectFontsToScss);
const css = series(injectFontsToScss, injectComponentsScss, compileScss);
const js = parallel(componentsJs, copyJs);
const img = copyImages;
const build = parallel(css, series(fonts, html), js, img);

module.exports = {
  injectFontFaces,
  injectFontLinks,
  injectFontsToPug,
  injectFontsToScss,
  img,
  js,
  css,
  fonts,
  html,
  build,
}