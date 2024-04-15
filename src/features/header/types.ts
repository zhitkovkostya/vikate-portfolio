type MenuItem = {
  title: string;
  path: string;
};

export type Props = {
  siteTitle: string;
  pageTitle: string;
  menuItems: MenuItem[];
};