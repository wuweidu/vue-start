module.exports = [
  {
    name: 'home',
    path: '/',
    component: require('./component/index/home').default,
    meta: {
      a: 1
    }
  },
  {
    name: 'user',
    path: '/user',
    component: require('./component/index/user').default,
  },
];
