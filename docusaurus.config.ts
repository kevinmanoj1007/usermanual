import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Genie User Manual',
  tagline: 'AI For EE',
  favicon: 'img/favicon.ico',

  url: 'https://docs.genie.com',
  baseUrl: '/',

  organizationName: 'asterquanta',
  projectName: 'documentation',

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
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'adk',
        path: 'adk',
        routeBasePath: 'adk',
        sidebarPath: './sidebars.ts',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'connectors',
        path: 'connectors',
        routeBasePath: 'connectors',
        sidebarPath: require.resolve('./sidebarsConnectors.ts'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tools',
        path: 'tools',
        routeBasePath: 'tools',
        sidebarPath: require.resolve('./sidebarsTools.ts'),
      },
    ],
  ],
  themeConfig: {
    image: 'TODO',
    navbar: {
      title: 'Genie User Manual',
      logo: {
        alt: 'Asterquanta Logo',
        src: 'img/favicon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Platform Tutorial',
        },
        {
          position: 'left',
          label: 'ADK Documentation',
          to: '/adk/getting-started',
        },
        {
          type: 'docSidebar',
          sidebarId: 'connectorsSidebar',
          label: 'Connectors',
          position: 'left',
          docsPluginId: 'connectors',
        },
        {
          type: 'docSidebar',
          sidebarId: 'toolsSidebar',
          label: 'Tools',
          position: 'left',
          docsPluginId: 'tools',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'User Manual',
          items: [
            {
              label: 'Platform Tutorial',
              to: '/docs/intro',
            },
            {
              label: 'ADK Documentation',
              to: '/adk/getting-started',
            },
            {
              label: 'Connectors',
              to: '/connectors/intro',
            },
            {
              label: 'Tools',
              to: '/tools/intro',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Asterquanta, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  future: {
    experimental_router: 'hash',
  },
};

export default config;
