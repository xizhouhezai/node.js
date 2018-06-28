<template>
  <div class="selector">
    <div>
      <wxc-button
        :text="sText"
        type="white"
        :btnStyle="btnStyle"
        @wxcButtonClicked="openBottomPopup"
        :disabled="disabled"
      ></wxc-button>
    </div>
    <wxc-popup
      ref="box"
      :show="isBottomShow"
      pos="bottom"
      height="400"
      @wxcPopupOverlayClicked="popupOverlayBottomClick"
    >
      <scroller class="scroller">
        <wxc-cell
          v-for="(item, index) in optionData"
          :key="index"
          :title="item.name"
          :has-arrow="false"
          :has-margin="true"
          @click="overlayBottomClick(item)"
        ></wxc-cell>
      </scroller>
    </wxc-popup>
  </div>
</template>

<script>
import { WxcPopup, WxcButton, WxcCell } from 'weex-ui'

export default{
  props: {
    sText: {
      type: String,
      default: () => ''
    },
    optionData: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    btnStyle: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isBottomShow: false,
      WxHeight: '',
    }
  },
  methods: {
    openBottomPopup() {
      if (!this.disabled) {
        this.isBottomShow = true;
      }
    },
    popupOverlayBottomClick() {
      this.isBottomShow = false;
    },
    overlayBottomClick(item) {
      this.isBottomShow = false;
      this.$emit('overlayBottomClick', item);
    }
  },
  components: {
    WxcPopup,
    WxcButton,
    WxcCell
  }
}
</script>

<style scoped>
.selector {
  justify-content: center;
  align-items: center;
}
.scroller {
  height: 400px;
}
</style>
