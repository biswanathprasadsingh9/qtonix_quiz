// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: process.env.DB_BACKENDURL+'/api',
    backendURLPDF: process.env.DB_BACKENDURL+'/pdf/',


  },
}

module.exports = nextConfig