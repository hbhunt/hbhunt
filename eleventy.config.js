const htmlmin = require("html-minifier")
const sortByDisplayOrder = require('./site/utils/sort-by-display-order.js')
const rssPlugin = require('@11ty/eleventy-plugin-rss');

// Filters
const dateFilter = require('./site/filters/date-filter.js');
const w3DateFilter = require('./site/filters/w3-date-filter.js');

module.exports = eleventyConfig => {

    // Add plutins
    eleventyConfig.addPlugin(rssPlugin);

    // Add filters
    eleventyConfig.addFilter('dateFilter', dateFilter);
    eleventyConfig.addFilter('w3DateFilter', w3DateFilter);


    // Minify our HTML
    eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
        if ( outputPath.endsWith(".html") )
        {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            })
            return minified
        }
        return content
    })

    // Collections

    // Returns projects, sorted by display order
    eleventyConfig.addCollection('work', collection => {
        return sortByDisplayOrder(collection.getFilteredByGlob('./site/work/*.md'));
    })

    eleventyConfig.addCollection('featuredWork', collection => {
        return sortByDisplayOrder(collection.getFilteredByGlob('./site/work/*.md')).filter(
            x => x.data.featured);
    });

    // Returns a collection of blog posts in reverse date order
    eleventyConfig.addCollection('blog', collection => {
        return [...collection.getFilteredByGlob('./site/posts/*.md')].reverse();
    });

    // Returns a list of people ordered by filename
    eleventyConfig.addCollection('people', collection => {
        return collection.getFilteredByGlob('./site/people/*.md').sort((a, b) => {
        return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
        });
    });

    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/default.njk')
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

    // Include our static assets
    eleventyConfig.addPassthroughCopy("css")
    eleventyConfig.addPassthroughCopy("js")
    eleventyConfig.addPassthroughCopy("images")
    eleventyConfig.addPassthroughCopy("robots.txt")

    // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
    eleventyConfig.setUseGitIgnore(false);

    return {
        templateFormats: ["md", "njk"],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,

        dir: {
            input: 'site',
            output: 'dist',
            includes: 'includes',
            data: 'globals'
        }
    }

}