<template>
  <a @click="enroll">
    <text class="message" v-text="message"></text>
  </a>
</template>
<script>

export default {
  data() {
    return {
      message: '开始报名',
    };
  },
  mounted () {
    this.getData()
  },
  methods: {
    enroll() {
      this.$loc.open('/enroll');
      // this.$loc.open('/enroll?id=1&cid=2'); method of transmitting params
    },
    getData() {
      this.$http.get({
        name: 'category.index',
        data: {
          refid: 35
        },
      }).then((data) => {
        console.log(data)
      })
    },
  },
};

</script>
<style scoped>
  .message {
    margin: 30px;
    font-size: 32px;
    color: #727272;
  }
</style>
