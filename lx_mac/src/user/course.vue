<template>
  <div class="course">
    <fu-head 
      title="我的课程" 
      rightIcon="menu" 
      @leftIconClick="openRightPopup"
      :barStyle="{position: 'fixed'}"
    ></fu-head>
    <scroller class="course-content" :style="{height: offsetHeight + 'px'}">
      <wxc-cell 
        title="观看记录"
        desc="这里是附加信息"
        :has-arrow="false"
        :has-bottom-border="false"
      >
        <image
          slot="label"
          src="http://pace4yliw.bkt.clouddn.com/img/boluo.jpeg"
          style="width: 80px; height: 80px; margin-right: 20px"
        />
      </wxc-cell>
      <div class="course-box">
        <wxc-cell
          v-for="index in 20"
          :key="index"
          :title="'list' + index"
          desc="这里是附加信息"
          :has-arrow="false"
          :has-margin="true"
        >
          <image
            slot="label"
            src="http://pace4yliw.bkt.clouddn.com/img/boluo.jpeg"
            style="width: 80px; height: 80px; margin-right: 20px"
          />
        </wxc-cell>
      </div>
    </scroller>
    <wxc-popup
      :show="isRightShow"
      pos="right"
      width="400"
      @wxcPopupOverlayClicked="popupOverlayRightClick"
    >
      <scroller class="scroller" :style="{height: offsetHeight + 'px'}">
        <wxc-cell
          v-for="index in 20"
          :key="index"
          :title="'list' + index"
          desc="这里是附加信息"
          :has-arrow="false"
          :has-margin="true"
        >
          <image
            slot="label"
            src="http://pace4yliw.bkt.clouddn.com/img/boluo.jpeg"
            style="width: 80px; height: 80px; margin-right: 20px"
          />
        </wxc-cell>
      </scroller>
    </wxc-popup>
  </div>
</template>

<script>
  /* eslint-disable */
  import { WxcPopup, WxcCell } from 'weex-ui';
  import { StaticUrl } from '@/assets/utils/constants';

  const dom = weex.requireModule('dom')

  export default {
    data() {
      return {
        isRightShow: false,
        staticUrl: StaticUrl,
        offsetHeight: 0,
      }
    },
    mounted () {
      this.offsetHeight = dom.getComponentRect('viewport').contentSize.height;
      this.$storage.getJSON('user').then(result => {
        this.$http.get({
          headers: {
            'Authorization': 'Bearer ' + result.token,
          },
          name: 'course-majors',
          params: {
            id: this.$context.params.id
          },
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    methods: {
      openRightPopup() {
        console.log(1111111)
        this.isRightShow = true;
      },
      popupOverlayRightClick() {
        this.isRightShow = false;
      }
    },
    components: {
      WxcPopup,
      WxcCell,
      'fu-head': () => import('@components/layouts/fu-head'),
    },
  }
</script>

<style scoped>
.course-content {
  margin-top: 100px
}
.course-box {
  margin-top: 50px;
}
</style>
