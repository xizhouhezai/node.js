<template>
  <div class="input-captcha">
    <div class="input-content">
      <input :type="inputType" :maxlength="inputMaxLength" :placeholder="inputPlaceholder" autofocus="true" class="common-input" ref="input" @input="$emit('input', $event.target.value)">
    </div>
    <div class="captcha">
     <wxc-countdown
        v-if="timeShow"
        tpl="{s} 秒" 
        :time="count"
        :timeWrapStyle="{backgroundColor: '#ffffff', border: '1px solid gray', height: '80px', justifyContent: 'center',margin: 0, borderRadius: '10px'}"
        :timeBoxStyle="{backgroundColor: 'none'}"
        :dotBoxStyle="{width: '30px', border: 'none'}"
        :timeTextStyle="{backgroundColor: '#ffffff', color: '#000000'}"
        :dotTextStyle="{fontSize: '26px'}"
        @wxcOnComplete="onCompleted"></wxc-countdown>
       <wxc-button text="重新发送" size="small" @click="getCaptcha" type="white" class="captchaButton" :btnStyle="{margin: 0}" v-else></wxc-button>
    </div>
  </div>
</template>

<script>

import { WxcButton, WxcCountdown } from 'weex-ui';

export default {
  components: {
    WxcButton,
    WxcCountdown
  },
  data() {
    return {
      timeShow: true
    }
  },
  props: {
    inputType: {
      type: String,
      default: () => '',
    },
    inputMaxLength: {
      type: Number,
      default: () => null,
    },
    inputPlaceholder: {
      type: String,
      default: () => '',
    },
    count: {
      type: Number,
      default: () => new Date().getTime(),
    }
  },

  methods: {
    getCaptcha() {
      this.$emit('getCaptcha');
      this.timeShow = true;
    },
    onCompleted() {
      this.timeShow = false;
    }
  }
}
</script>

<style scoped>
.input-captcha {
  flex-direction: row;
  align-items: center;
  justify-content: center;
	padding-top: 8px;
	padding-bottom: 15px;
  width: 600px;
}

.input-content {
  flex: 3;
}

.common-input {
	padding-top: 5px;
	padding-right: 10px;
	padding-bottom: 5px;
	padding-left: 10px;
	height: 80px;
	border-width: 1px;
	border-style: solid;
	border-color: #33b5e5;
  border-radius: 10px;
}

.captcha {
  flex: 1;
  padding-left: 20px;
  padding-right: 15px;
}

.captchaButton {
  height: 80px;
}
</style>


