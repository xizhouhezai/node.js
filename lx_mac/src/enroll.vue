<template>
  <div>
    <fu-head title="在线报名" leftIcon=""></fu-head>
    <div class="container">
      <text class="heading">来学机构报名系统</text>

      <input type="tel" maxlength="11" placeholder="输入手机号码" v-model="phone" :autofocus="true" class="input-enroll-phone" v-if="step === 'check'">
      
      <fu-captcha inputType="text" :inputMaxLength=4 inputPlaceholder="输入验证码" v-model="captcha" :count="count" @getCaptcha="getCaptcha" v-else></fu-captcha>

      <text class="input-enroll-warn">{{ errorNotice }}</text>
      <wxc-button :text="buttonText" type="blue" size="big" @click="clickEvent" class="enrollButton"></wxc-button>

    </div>
  </div>
</template>

<script>

import { WxcButton } from 'weex-ui';

import Crypto from './assets/utils/crypto';

export default {
  components: {
    WxcButton,
    'fu-head': () => import('@components/layouts/fu-head'),
    'fu-captcha': () => import('@components/commons/fu-captcha'),
  },
  name: 'site-enroll',
  data() {
    return {
      phone: '',
      errorNotice: '',
      buttonText: '开始报名',
      captcha: '',
      step: 'check',
      count: null,
      registered: 0,
      key: this.$context.query.key,
    }
  },
  methods: {
    clickEvent() {
      this.step === 'check' ? this.check() : this.auth();
    },
    // check whether the phone number has been registered
    check() {
      if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone))) {
        this.errorNotice = '请输入正确的手机号码';
        return false;
      }
      this.errorNotice = '';
      this.step = 'auth';
      this.buttonText = '确定';
      this.count = new Date().getTime() + 60000;
      let phone = this.phone;
      let captch = async () => {
        let data = await this.$http.get({name: 'check.index', data: {phone: phone}})
        this.registered = data.registered
        // await this.getCaptcha();
      }
      captch();
    },
    // recapture the verifying code
    getCaptcha() {
      this.count = new Date().getTime() + 60000;
      let Operation = this.registered ? 'login' : 'reg';
      this.getSms(Operation);
    },
    // get the verifiying code
    getSms(Operation) {
      this.$http.get({
        name: 'regSms.index',
        data: {
          phone: this.phone,
          product: '来学宝典',
          operation: Operation,
        }
      });
    },
    // detection verification code
    auth() {
      let user = async () => {
        let data = this.registered === 0 ? await this.$http.post({
          name: 'reg.index',
          data: {
            phone: this.phone,
            captcha: this.captcha,
            source: 'MOBILE',
            key: this.key,
          }
        }) : await this.$http.post({
          name: 'auth.index',
          data: {
            username: this.phone,
            password: this.captcha,
            type: 'captcha',
            key: this.key,
          }
        });
        return data;
      }
      user().then((data) => {
        let token = Crypto(data.token);
        this.$storage.setJSON('user', token);
        this.$loc.open(`/user/${token.id}/${this.key}/enroll`);
        console.log(this.captcha)
      },() => {
        this.errorNotice = '请输入正确的4位数验证码';
      })
    },
  },
};
</script>

<style scoped>
.container {
  align-items: center;
  justify-content: center;
}

.heading {
  padding-top: 80px;
  padding-bottom: 80px;
  font-size: 48px;
  text-align: center;
  font-family: 宋体;
  color: #0d0d0d;
}

.input-enroll-phone {
  padding-top: 5px;
	padding-right: 10px;
	padding-bottom: 5px;
	padding-left: 10px;
  width: 600px;
  height: 80px;
  border-width: 1px;
  border-style: solid;
  border-color: #33b5e5;
  border-radius: 20px;
}

.input-enroll-warn {
  width: 600px;
	padding-top: 15px;
	font-size: 14px;
	color: #ff0000;
}

.enrollButton {
  margin-top: 30px;
}

</style>
