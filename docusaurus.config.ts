import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'iec-checker',
  tagline: 'Static analyzer for IEC 61131-3',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://iec-checker.github.io',
  baseUrl: '/',

  organizationName: 'iec-checker',
  projectName: 'iec-checker.github.io',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
      type: 'text/css',
      integrity:
        'sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==',
      crossorigin: 'anonymous',
      referrerpolicy: 'no-referrer',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/iec-checker/iec-checker.github.io/tree/main/',
        },
        blog: false,
        gtag: {
          trackingID: 'G-J7N5642ZHP',
          anonymizeIP: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'iec-checker',
      // no logo image — title text only
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/detectors',
          label: 'Detectors',
          position: 'left',
        },
        {
          href: 'pathname:///api/iec_checker/',
          label: 'API',
          position: 'left',
        },
        {
          to: '/playground',
          label: 'Try Online',
          position: 'right',
        },
        {
          href: 'https://github.com/iec-checker/iec-checker',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="/docs/sponsor-development" style="color: inherit; text-decoration: underline;">iec-checker contributors</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
