const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'quick-start',
        'installation',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'philosophy',
        'architecture',
        'resources',
      ],
    },
    {
      type: 'category',
      label: 'Interfaces',
      items: [
        'interfaces/cli',
        'interfaces/gui',
        'interfaces/api',
      ],
    },
  ],
};

module.exports = sidebars;