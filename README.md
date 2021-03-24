# SqlGen - An online SQL Query generator

An online sql editor made with [nuxt](https://nuxtjs.org/), [vuetify](https://vuetifyjs.com/en/), [nuxt-content](https://github.com/nuxt/content) and [highlight.js](https://highlightjs.org/) for syntax highlighting.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# Demo

![demo workflow](assets/workflow.gif)

## Demo - running predefined queries

![demo running predefined queries](assets/sampleQuery.gif)

# Page Load Time

Tested using lighthouse

### Desktop

| Item                           | Value    |
| ------------------------------ | -------- |
| FCP (First Contentful Paint)   | 562 ms   |
| SI (Speed Index)               | 1,282 ms |
| LCP (Largest Contentful Paint) | 707 ms   |
| TTI (Time to Interactive)      | 823 ms   |
| TBT (Total Blocking Time)      | 6 ms     |
| CLS (Cumulative Layout Shift)  | 0.00     |

### Mobile

| Item                           | Value    |
| ------------------------------ | -------- |
| FCP (First Contentful Paint)   | 2,124 ms |
| SI (Speed Index)               | 5,219 ms |
| LCP (Largest Contentful Paint) | 3,044 ms |
| TTI (Time to Interactive)      | 3,569 ms |
| TBT (Total Blocking Time)      | 330 ms   |
| CLS (Cumulative Layout Shift)  | 0.02     |
