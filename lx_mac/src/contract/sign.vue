<template>
	<div>
		<fu-head title="签订协议"></fu-head>
		<div class="wrapper">
			<div class="sign-input">
				<input type="text" placeholder="乙方姓名" v-model="username" class="input">
				<text class="warn">{{ userError }}</text>
			</div>
			<div class="sign-input">
				<input type="text" placeholder="身份证号" v-model="IDcard" maxlength="18" class="input">
				<text class="warn">{{ IcError }}</text>
			</div>
			<div class="sign-input">
				<input type="tel" placeholder="手机号" v-model="phone" maxlength="11" class="input">
				<text class="warn">{{ phoneError }}</text>
			</div>
			<div class="sign-input">
				<input type="email" placeholder="邮箱" v-model="email" class="input">
				<text class="warn">{{ emailError }}</text>
			</div>
			<div class="sign-select">
				<fu-selector
					:optionData="provinceOptionData"
					:sText="provinceOption ? provinceOption: provinceText"
					@overlayBottomClick="provinceBottomClick"
					:disabled="false"
					:btnStyle="{width: '280px'}"
				></fu-selector>
				<fu-selector
					:optionData="cityOptionData"
					:sText="cityOption ? cityOption: cityText"
					@overlayBottomClick="cityBottomClick"
					:disabled="cityDisabled"
					className="selectList"
					:btnStyle="{width: '280px'}"
				></fu-selector>
			</div>
			<div class="select-error">
				<text class="warn">{{ selectError }}</text>
			</div>
			<div class="sign-input">
				<input type="text" placeholder="详细地址" v-model="address" class="input">
				<text class="warn">{{ addressError }}</text>
			</div>
			<div class="sign-input">
				<text>签订时间：{{ getTime() }}</text>
			</div>
			<wxc-button text="确定预签约" type="blue" size="big" @click="signContract" class="signBotton"></wxc-button>
		</div>
	</div>
</template>

<script>

import { WxcCheckboxList, WxcButton, WxcDialog } from 'weex-ui';

const city = require('../assets/utils/city.min');

export default {
  components: {
    WxcCheckboxList,
    WxcButton,
    WxcDialog,
    'fu-head': () => import('@components/layouts/fu-head'),
    'fu-selector': () => import('@components/commons/fu-selector')
	},
	data() {
		return {
			username: '',
			IDcard: '',
			phone: '',
			email: '',
			address: '',
			userError: '',
			IcError: '',
			phoneError: '',
			emailError: '',
			addressError: '',
			professionOptionData: '',
			provinceText: '请选择省份',
			cityText: '请选择市/区',
			cityDisabled: true,
			provinceOptionData: [],
			cityOptionData: [],
			provinceOption: '',
			cityOption: '',
			selectError: '',
			userIp: '',
		}
	},
	mounted: function() {
		this.getTime();
		this.getCityList();
		this.ongoing();
	},
	methods: {
		async ongoing() {
			const result = await this.$storage.getJSON('user');
			const ongoingContract = await this.$http.get({
				headers: {
					'Authorization': 'Bearer ' + result.token,
				},
				name: 'contract-preview',
				params: {
					id: this.$context.params.id,
				},
				data: {
					expand: 'userProfile'
				},
			})
			const userProfile = ongoingContract.Expand.user_profile;
			if(userProfile){
				this.username = userProfile.profile_name;
				this.IDcard = userProfile.profile_ic;
				this.phone = userProfile.profile_phone;
				this.email = userProfile.profile_email;
				this.provinceOption = userProfile.profile_province;
				this.cityOption = userProfile.profile_city;
				this.address = userProfile.profile_address;
			}
			
		},
		getCityList() {
			city.citySelect.forEach((i,index) => {
				this.provinceOptionData.push({name: i.p, id: index});
			});
		},

		provinceBottomClick(i) {
			this.provinceOption = i.name;
			this.cityDisabled = false;
			if(this.cityOptionData.length != 0){
				this.cityOptionData = [];
			}
			city.citySelect[i.id].c.forEach(j => {
				this.cityOptionData.push({name:	j.n})
			});
			this.cityOption = this.cityOptionData[0].name;
			
		},

		cityBottomClick(i) {
			this.cityOption = i.name;
		},
		
		async signContract() {
			this.userError = '';
			this.IcError = '';
			this.phoneError = '';
			this.emailError = '';
			this.addressError = '';
			this.selectError = '';

			if(!(/^[\u4e00-\u9fa5 ]{2,20}$/.test(this.username))){
				this.userError = '请输入正确的姓名';
				return false;
			}
			if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IDcard))) {
				this.IcError = '请输入正确的身份证号码';
				return false;
			}
			if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone))){
				this.phoneError = '请输入正确的手机号码';
				return false;
			}
			if(!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.email))){
				this.emailError = '请输入正确的邮箱地址';
				return false;
			}
			if(!this.cityOption){
				this.selectError = '请选择所在省份及城市';
				return false;
			}
			if(this.address.length < 6){
				this.addressError = '请输入正确的详细地址';
				return false;
			}
			const result = await this.$storage.getJSON('user');
			await this.$http.post({
				headers: {
					'Authorization': 'Bearer ' + result.token,
				},
				name: 'contract-sign.index',
				params: {
					id: this.$context.params.id,
				},
				data: {
					profile_name: this.username,
					profile_phone: this.phone,
					profile_email: this.email,
					profile_province: this.provinceOption,
					profile_city: this.cityOption,
					profile_address: this.address,
					profile_ic: this.IDcard,
				},
			});
			this.$loc.open(`/contract/${this.$context.params.id}/pay`);
		},

		getTime() {
			let now = new Date();
			let year = now.getFullYear();
			let month = now.getMonth()+1;
			let date = now.getDate();
			return `${year}年${month}月${date}日`;
		},
	}
}
</script>

<style scoped>
.wrapper {
	padding-top: 30px;
	align-items: center;
	justify-content: center;
}

.sign-input {
	padding-top: 18px;
	padding-bottom: 18px;
	width: 600px;
}

.input {
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

.select-error {
	width: 600px;
}

.warn {
	padding-top: 5px;
	font-size: 14px;
	color: #ff0000;
}

.sign-select {
	flex-direction: row;
	justify-content: space-between;
	width: 600px;
}

.selector {
	flex: 1;
	margin-bottom: 10px;
}

.signBotton {
	margin-top: 20px;
}
</style>

