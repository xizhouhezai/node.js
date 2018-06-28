import apis from './apis';
import router from './router';

export default {
  httpOptions: {
    baseUrl: process.env.API_HOST,

    apis,
  },

  router,
};
