import Vue from 'vue';

export default {
	createVue(vuePage) {
		const Constructor = Vue.extend(vuePage);
		return new Constructor().$mount();
	}
}