/**
 * router defination
 */
export default {
  routes: [
    {
      path: '/',
      component: 'index.js',
    },
    {
      path: '/enroll',
      component: 'enroll.js',
    },
    // {
    //   path: '/majors',
    //   component: 'majors/index.js'
    // },
    {
      path: '/user/:id/:key/enroll',
      component: 'user/enroll.js'
    },
    {
      path: '/contract/:id/preview',
      component: 'contract/preview.js'
    },
    {
      path: '/contract/:id/sign',
      component: 'contract/sign.js'
    },
    {
      path: '/contract/:id/pay',
      component: 'contract/pay.js'
    },
    {
      path: '/contract/:id/pay-success',
      component: 'contract/pay-success.js'
    },
    {
      path: '/user/:id/course',
      component: 'user/course.js'
    },
  ],
};
