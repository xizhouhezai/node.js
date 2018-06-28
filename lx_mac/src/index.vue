<template>
  <div class="wrapper">
    <image :src="logo" class="logo" />
    <HelloWorld/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    HelloWorld: () => import('@components/HelloWorld'),
  },
  data() {
    return {
      logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png',
    };
  },
};
</script>

<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }
  .logo {
    width: 424px;
    height: 200px;
  }
</style>