module.exports = {
  title: 'Open Source Programs Web Docs',
  tagline: 'Documentation for Open Source Programs Web',
  url: 'https://osp-web-docs.surge.sh',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'AnitaB.org',
  projectName: 'open-source-programs-web-docs',
  themeConfig: {
    navbar: {
      title: 'Open Source Programs Web',
      hideOnScroll: true,
      logo: {
        alt: 'AnitaB.org Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href:'https://www.anitab.org',
          label: 'AnitaB.org',
          position: 'right',
        },
        {
          href:'https://anitab-org.zulipchat.com/#narrow/stream/237907-open-source-progs',
          label: 'Zulip',
          position: 'right',
        },
        {
          href: 'https://github.com/anitab-org/open-source-programs-web',
          label: 'GitHub',
          position: 'right',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Backend Docs',
              href: 'https://osp-backend-docs.surge.sh/',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Zulip',
              href: 'https://anitab-org.zulipchat.com/#narrow/stream/237907-open-source-progs',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/anitab_org',
            },
          ],
        },
        {
          title: 'More',
          items: [ 
            {
              label: 'GitHub',
              href: 'https://github.com/anitab-org/open-source-programs-web',
            },
            {
              label: 'Blog',
              href:'https://medium.com/anitab-org-open-source'
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AnitaB.org`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/anitab-org/open-source-programs-web/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
