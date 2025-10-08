const config = {
  title: 'DataOS Documentation',
  tagline: 'Enterprise Data Operating System',
  favicon: 'img/favicon.ico',

  url: 'https://abhishek4411.github.io',
  baseUrl: '/DataOS-Sample-Documentation/',

  organizationName: 'Abhishek4411',
  projectName: 'DataOS-Sample-Documentation',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // IMPORTANT: Makes docs the root
          editUrl: 'https://github.com/your-username/dataos-docs-demo/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/dataos-social-card.jpg',
    
    navbar: {
      title: 'DataOS',
      logo: {
        alt: 'DataOS Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/your-username/dataos-docs-demo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/',
            },
            {
              label: 'Quick Start',
              to: '/quick-start',
            },
            {
              label: 'Installation',
              to: '/installation',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Philosophy',
              to: '/philosophy',
            },
            {
              label: 'Architecture',
              to: '/architecture',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/your-username/dataos-docs-demo',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DataOS. Built with Docusaurus.`,
    },
    
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
      additionalLanguages: ['bash', 'yaml', 'json', 'sql'],
    },
    
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  },
  trailingSlash: false,
};

module.exports = config;
