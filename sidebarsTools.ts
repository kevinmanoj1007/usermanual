import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  toolsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'How to Setup Docker',
      collapsed: false,
      items: [
        'setup-docker/windows',
        'setup-docker/linux',
        'setup-docker/mac',
      ],
    },
    {
      type: 'doc',
      id: 'xschem',
      label: 'XSchem',
    },
  ],
};

export default sidebars;
