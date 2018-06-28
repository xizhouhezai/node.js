<template>
  <div>
    <fu-head title="支付"></fu-head>
    <div class="contract-pay">
      <text class="pay-title" v-text="title"></text>

      <wxc-cell v-for="subject in subjects"
        :key="subject.id"
        :label="subject.name"
        :title="'CNY ' + subject.price"
        :has-margin="true"></wxc-cell>
      <wxc-cell label="合计"
        :title="'CNY ' + total"
        :has-margin="true">
        <wxc-button text="刷新" size="small" @wxcButtonClicked="refresh"></wxc-button>
      </wxc-cell>

      <div style="align-items: center">
        <wxc-button text="微信支付" type="blue" size="big" @wxcButtonClicked="wxpayment"></wxc-button>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import { WxcCell, WxcButton } from 'weex-ui';
  import { StorageKey } from '../assets/utils/constants';

  export default {
    data() {
      return {
        title: '订单详情',
        subjects: [],
        total: 0,
        fee: 0,
        contract_id: '',
        openid: '',
      }
    },
    created() {
      // code 061ghiq22iFfwX0qGLp22HSCq22ghiq7
      // openid oQduZtyndEv1EiP9f8ml4hZNeO7A
      this.contract()
    },
    methods: {
      init() {
        let uri = encodeURIComponent('http://m.laixue.com')
        this.$storage.getJSON('contract_id').then(res => {
          if (this.$context.params.id && res.contract_id !== this.$context.params.id) {
            this.$storage.remove('code');
            this.$storage.setJSON('contract_id', this.$context.params.id);
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx85157966e5f6ea86&redirect_uri=${uri}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
          } else {
            this.contract_id = res.contract_id;
          }
        }).catch(err => {
          this.$storage.setJSON('contract_id', this.$context.params.id);
        })
        
        this.$storage.getJSON('code').then(res => {
          this.$http.get({
            name: 'auth2',
            data: {
              appid: 'wx85157966e5f6ea86',
              code: res.code,
            },
          }).then(res => {
            console.log(res)
            this.openid = res.openid;
          }).catch(err => {
            this.$storage.remove('code');
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx85157966e5f6ea86&redirect_uri=${uri}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
          })
        }).catch(err => {
          if (this.$context.query.code) {
            this.$storage.setJSON('code', this.$context.query.code);
            this.$storage.getJSON('code').then(res => {
              this.$http.get({
                name: 'auth2',
                data: {
                  appid: 'wx85157966e5f6ea86',
                  code: res.code,
                },
              }).then(res => {
                console.log(res)
                this.openid = res.openid;
              })
            })
          } else {
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx85157966e5f6ea86&redirect_uri=${uri}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
          }
        })
      },
      refresh() {
        this.total = this.fee
      },
      async contract() {
        const result = await this.$storage.getJSON(StorageKey.USER);
        let items = await this.$http.get({
          headers: {
            'Authorization': 'Bearer ' + result.token,
          },
          name: 'contract-preview', 
          params: {
            // id: this.contract_id,
            id: this.$context.params.id,
          },
          data: {
            expand: 'subjects',
          }
        })
        this.subjects = items.Expand.subjects;
        this.fee = items.fee;
        let tmpArray = this.subjects.map((item) => {
          return item.price
        });
        this.total = tmpArray.reduce((total, item) => {
          return total + item
        });
      },
      async wxpayment() {
        const result = await this.$storage.getJSON(StorageKey.USER);
        let paydata = await this.$http.post({
          headers: {
            'Authorization': 'Bearer ' + result.token,
          },
          name: 'contract-pay', 
          params: {
            // id: this.contract_id,
            id: this.$context.params.id,
          },
          data: {
            deal_type: 'WEIXIN'
          }
        })
        console.log(paydata)
        let paysuccessdata = await this.$http.post({
          name: 'pay-submit', 
          data: {
            ...paydata,
            // openid: this.openid,
            openid: 'oQduZtyndEv1EiP9f8ml4hZNeO7A',
            trade_type: 'JSAPI'
          }
        })
        console.log(paysuccessdata)
        alert(111111)
        this.callpay()
      },
      jsApiCall() {
        // appid=wx0f6f838223764eaf&nonce_str=1530172958008825900&package=prepay_id=wx28160239210275f64ebc34060237302771&signType=MD5&timeStamp=1530172958&key=EYYjHSIfTEJwNDGGiZPOuRinUvRRtoH7
        WeixinJSBridge.invoke("getBrandWCPayRequest",{
          appid: 'wx0f6f838223764eaf',
          nonce_str: '1530172958008825900',
          package: 'prepay_id=wx28160239210275f64ebc34060237302771',
          signType: 'MD5',
          timeStamp: '1530172958',
          key: 'EYYjHSIfTEJwNDGGiZPOuRinUvRRtoH7'
        }, function(res){
            WeixinJSBridge.log(res.err_msg);
            //alert(res.err_code+res.err_desc+res.err_msg);
            if(res.err_msg == "get_brand_wcpay_request:ok"){
                    window.location.href="' . $succ_url . '";
            }else{
                alert(支付失败);
                window.location.href="' . $fail_url . '";
            }
          }
        );
      },
      callpay() {
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener("WeixinJSBridgeReady", jsApiCall, false);
          }else if (document.attachEvent){
            document.attachEvent("WeixinJSBridgeReady", jsApiCall);
            document.attachEvent("onWeixinJSBridgeReady", jsApiCall);
          }
        }else{
          this.jsApiCall();
        }
      }
    },
    components: {
      WxcCell,
      WxcButton,
      'fu-head': () => import('@components/layouts/fu-head'),
    }
  }
</script>

<style scoped>
  .pay-title {
    padding-left: 24px;
    height: 80px;
    line-height: 80px;
    background-color: #f0f8f0;
  }
</style>
