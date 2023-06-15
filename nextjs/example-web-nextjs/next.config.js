/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  ...nextTranslate(),
  ignoreBuildErrors: true,
};

module.exports = nextConfig;

// module.exports = {
//   reactStrictMode: true,
//   swcMinify: true,
//   ...nextTranslate(),
//   exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
//     return {
//       "/": { page: "/" },
//       "/aboutme": { page: "/aboutme" },
//       "/product": { page: "/product" },
//       "/qaqc": { page: "/qaqc" },
//       "/production_control": { page: "/production_control" },
//       "/delivery": { page: "/delivery" },
//       "/certificate": { page: "/certificate" },
//       "/activity": { page: "/activity" },
//       "/recruitment": { page: "/recruitment" },
//       "/sdgs": { page: "/sdgs" },
//       "/contact": { page: "/contact" },
//       "/privacy": { page: "/privacy" },
//     };
//   },
// };
