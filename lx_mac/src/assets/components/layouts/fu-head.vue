<template>
    <wxc-minibar
			:title="title"
			background-color="#009ff0"
			text-color="#fff"
			:style="barStyle"
		>
			<span slot="left" class="iconfont icon-back" v-if="leftIcon === null" style="color: #fff;"></span>
			<span slot="left" v-else-if="leftIcon === ''"></span>
			<span slot="left" :class="`iconfont icon-${leftIcon}`" v-else></span>
			<span slot="right" v-if="rightIcon === ''"></span>
			<span 
				slot="right" 
				:class="`iconfont icon-${rightIcon}`" 
				style="color: #fff;" 
				v-else
				@click="leftIconClick"
			></span>
		</wxc-minibar>
</template>

<script>
import { WxcMinibar } from 'weex-ui';

export default {
	name: 'fu-head',
	components: { WxcMinibar },
	props: {
		title: {
			type: String,
			default: () => '',
		},
		leftIcon: {
			type: String,
			default: () => null,
		},
		rightIcon: {
			type: String,
			default: () => '',
		},
		barStyle: {
			type: Object,
			default: () => {},
		},
	},
	methods: {
		leftIconClick() {
			this.$emit('leftIconClick')
		}
	},
}
</script>
