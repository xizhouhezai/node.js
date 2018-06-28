<template>
  <div>
    <fu-head title="支付完成"></fu-head>
    <div class="pay-success">
      <image
        :src="staticUrl + '/256x256.png'"
        style="width: 300px; height: 300px"
      />
      <text class="mt">报名成功，请点击来学宝典app进行学习</text>
      <wxc-button
        text="点击下载"
        size="medium"
        type="blue"
        class="mt"
      ></wxc-button>
      <text class="mt">关注来学宝典公众号，及时了解直播课动态</text>
      <image
        :src="staticUrl + '/weixin.png'"
        style="width: 500px; height: 500px"
        class="mt"
      />
    </div>
  </div>
</template>

<script>
import { WxcButton } from 'weex-ui';
import { StaticUrl } from '@/assets/utils/constants';

export default {
  data() {
    return {
      staticUrl: StaticUrl
    }
  },
  components: {
    WxcButton,
    'fu-head': () => import('@components/layouts/fu-head'),
  }
}
</script>

<style scoped>
.pay-success {
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.mt {
  margin-top: 30px;
}
</style>
