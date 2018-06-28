import { expect } from 'chai';
import pay from '@/contract/pay';
import Util from '../util';

describe('pay.vue', () => {
	const vm = Util.createVue(pay);

  it('should render correct pay title', () => {
    expect(vm.$el.querySelector('.pay-title').innerText).to.equal('订单详情');
	});
});
