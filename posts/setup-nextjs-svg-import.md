---
title: 'Setup NextJS 12 to support SVG imports'
date: '2022-07-06'
---

**Setting up NextJS app SVG import support**

install `SVGR` package. It will allow us to import SVG files as JSX.Elements.

-`npm install --save-dev @svgr/webpack`

-Then inside `next.config.js` we need to add `webpack` configuration. So our `next.config.js` file looks like this:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
```

install `styled components` and add `compiler` option into `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
```
