const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const CleanCSS = require('clean-css');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksFilter('markdown', function(value) {
    return md.render(value);
  });

  eleventyConfig.addFilter('cssmin', function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addNunjucksAsyncFilter('autoprefixer', function(
    value,
    callback
  ) {
    postcss([autoprefixer])
      .process(value)
      .then(result => {
        result.warnings().forEach(warn => {
          console.warn(warn.toString());
        });
        callback(null, result.css);
      });
  });

  eleventyConfig.addPassthroughCopy('img');

  return {
    passthroughFileCopy: true
  };
};
