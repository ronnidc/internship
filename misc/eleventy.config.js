const markdownIt = require('markdown-it');
const markdownItLinkAttributes = require('markdown-it-link-attributes');

module.exports = function (eleventyConfig) {

    // Markdown config – eksterne links åbner i nyt vindue
    const md = markdownIt({
        html: true
    }).use(markdownItLinkAttributes, {
        matcher(href) {
            return href.startsWith('http');
        },
        attrs: {
            target: '_blank',
            rel: 'noopener'
        }
    });

    eleventyConfig.setLibrary('md', md);

    // Kopier filer
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/js");

    // Dansk datoformatering
    eleventyConfig.addFilter("daDato", function (date) {
        const måneder = [
            "januar", "februar", "marts", "april", "maj", "juni",
            "juli", "august", "september", "oktober", "november", "december"
        ];
        const d = new Date(date);
        return `${d.getDate()}. ${måneder[d.getMonth()]} ${d.getFullYear()}`;
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};