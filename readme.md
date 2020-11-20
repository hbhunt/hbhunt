[![Netlify Status](https://api.netlify.com/api/v1/badges/f4455669-0ce8-40ea-8ff5-5c31f0aadfa5/deploy-status)](https://app.netlify.com/sites/skeleventy/deploys)

# Portfolio – Static site generted with Eleventy 

* [Eleventy](https://www.11ty.dev/docs/)

## Requirements

Node `>=` v8.9.0

## Installation

```
npm install
```

To start the development server, run the `npm run dev` command in terminal. Eleventy has hot reloading baked in and will automatically watch your template files for changes.

## Folder Structure

The `src` folder contains all the templates, partials and content - which Eleventy will parse into HTML for us.

Within our `src` folder, lives a `globals` folder. Here you'll find a `site.json` file - for general config stuff e.g site name, author, email, social media links etc.

You'll also find a `navigation.json` file, which we use to loop over in our nav partial to generate our navigation.

In development mode, Skeleventy will reference `main.css` for it's stylesheet. This will be pretty chunky in filesize (around 800KB!), due to the amount of Tailwind utility classes - but don't worry, Skeleventy has you covered!

## Ready to deploy?

Type the `npm run production` command to minify scripts, styles and run Purgecss.

Purge will cross reference your templates/HTML with all those Tailwind classes and will remove any classes you haven't used - pretty cool huh?

Skeleventy will now reference `main.min.css` as the new stylesheet (annoyingly, Mix also minifies `main.css` as well - this bugs the hell out of me!).

## Netlify

(Add Content)
