/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://miladyacoub-law.com', // Replace with the actual domain if different
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: 'https://miladyacoub-law.com/ar',
      hreflang: 'ar',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
