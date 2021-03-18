const navConfig = [
  {
    title: "關於我們",
    submenu: null,
    hasParent: false,
    href: '/about'
  },
  {
    title: "部落格",
    submenu: [
      {
        title: "市場訊息",
        submenu: null,
        hasParent: true,
        href: '/market-info'
      },
      {
        title: "專業知識",
        submenu: null,
        hasParent: true,
        href: '/knowledge'
      },
      {
        title: "實務操作",
        submenu: null,
        hasParent: true,
        href: '/pratical'
      },
    ],
    hasParent: false,
    href: ''
  },
  {
    title: "Q&A",
    submenu: null,
    hasParent: false,
    href: '/questions'
  },
];

export default navConfig;
