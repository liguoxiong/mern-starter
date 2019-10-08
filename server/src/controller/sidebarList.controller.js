const database = [
  {
    id: "1",
    icon: "dashboard",
    name: "Dashboard",
    zh: {
      name: "仪表盘"
    },
    "pt-br": {
      name: "Dashboard"
    },
    route: "/dashboard"
  },
  {
    id: "2",
    breadcrumbParentId: "1",
    name: "Products",
    zh: {
      name: "用户管理"
    },
    "pt-br": {
      name: "Usuário"
    },
    icon: "shopping-cart",
    route: "/product"
  },
  {
    id: "6",
    breadcrumbParentId: "1",
    name: "Categories",
    zh: {
      name: "范畴"
    },
    "pt-br": {
      name: "Usuário"
    },
    icon: "appstore",
    route: "/category"
  },
  {
    id: "3",
    breadcrumbParentId: "1",
    name: "Info",
    zh: {
      name: "范畴"
    },
    "pt-br": {
      name: "Usuário"
    },
    icon: "user",
    route: "/info"
  },
  {
    id: "4",
    breadcrumbParentId: "1",
    name: "Banner",
    zh: {
      name: "范畴"
    },
    "pt-br": {
      name: "Usuário"
    },
    icon: "build",
    route: "/banner"
  },
  {
    id: "5",
    breadcrumbParentId: "1",
    name: "Service",
    zh: {
      name: "范畴"
    },
    "pt-br": {
      name: "Usuário"
    },
    icon: "cluster",
    route: "/service"
  },
  {
    id: "8",
    breadcrumbParentId: "1",
    name: "Construction",
    zh: {
      name: "范畴"
    },
    "pt-br": {
      name: "Usuário"
    },
    icon: "cluster",
    route: "/construction"
  }
  // {
  //   id: '7',
  //   breadcrumbParentId: '1',
  //   name: 'Posts',
  //   zh: {
  //     name: '用户管理',
  //   },
  //   'pt-br': {
  //     name: 'Posts',
  //   },
  //   icon: 'shopping-cart',
  //   route: '/post',
  // },
  // {
  //   id: '21',
  //   menuParentId: '-1',
  //   breadcrumbParentId: '2',
  //   name: 'User Detail',
  //   zh: {
  //     name: '用户详情',
  //   },
  //   'pt-br': {
  //     name: 'Detalhes do usuário',
  //   },
  //   route: '/user/:id',
  // },
  // {
  //   id: '3',
  //   breadcrumbParentId: '1',
  //   name: 'Request',
  //   zh: {
  //     name: 'Request',
  //   },
  //   'pt-br': {
  //     name: 'Requisição',
  //   },
  //   icon: 'api',
  //   route: '/request',
  // },
  // {
  //   id: '4',
  //   breadcrumbParentId: '1',
  //   name: 'UI Element',
  //   zh: {
  //     name: 'UI组件',
  //   },
  //   'pt-br': {
  //     name: 'Elementos UI',
  //   },
  //   icon: 'camera-o',
  // },
  // {
  //   id: '45',
  //   breadcrumbParentId: '4',
  //   menuParentId: '4',
  //   name: 'Editor',
  //   zh: {
  //     name: 'Editor',
  //   },
  //   'pt-br': {
  //     name: 'Editor',
  //   },
  //   icon: 'edit',
  //   route: '/UIElement/editor',
  // },
  // {
  //   id: '5',
  //   breadcrumbParentId: '1',
  //   name: 'Charts',
  //   zh: {
  //     name: 'Charts',
  //   },
  //   'pt-br': {
  //     name: 'Graficos',
  //   },
  //   icon: 'code-o',
  // },
  // {
  //   id: '51',
  //   breadcrumbParentId: '5',
  //   menuParentId: '5',
  //   name: 'ECharts',
  //   zh: {
  //     name: 'ECharts',
  //   },
  //   'pt-br': {
  //     name: 'ECharts',
  //   },
  //   icon: 'line-chart',
  //   route: '/chart/ECharts',
  // },
  // {
  //   id: '52',
  //   breadcrumbParentId: '5',
  //   menuParentId: '5',
  //   name: 'HighCharts',
  //   zh: {
  //     name: 'HighCharts',
  //   },
  //   'pt-br': {
  //     name: 'HighCharts',
  //   },
  //   icon: 'bar-chart',
  //   route: '/chart/highCharts',
  // },
  // {
  //   id: '53',
  //   breadcrumbParentId: '5',
  //   menuParentId: '5',
  //   name: 'Rechartst',
  //   zh: {
  //     name: 'Rechartst',
  //   },
  //   'pt-br': {
  //     name: 'Rechartst',
  //   },
  //   icon: 'area-chart',
  //   route: '/chart/Recharts',
  // },
];

const getRoutes = (req, res) => {
  res.status(200).json(database);
};
export default {
  getRoutes
};
