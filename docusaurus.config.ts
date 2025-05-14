import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Genie User Manual',
  tagline: 'AI For EE',
  favicon: 'img/favicon.ico',

  // ✅ Updated for GitHub Pages
  url: 'https://kevinmanoj1007.github.io',
  baseUrl: '/usermanual/',
  trailingSlash: false,

  // ✅ GitHub Pages deployment config
  organizationName: 'kevinmanoj1007',
  projectName: 'usermanual',

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

  themeConfig: {
    image: 'img/favicon.ico',
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
          label: 'Tutorial',
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
              label: 'Tutorial',
              to: '/usermanual/docs/intro',
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
};

export default config;
