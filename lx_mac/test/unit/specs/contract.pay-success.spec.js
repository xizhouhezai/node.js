import paySuccess from '@/contract/pay-success';
import { expect } from 'chai';
import Util from '../util';

describe('paySuccess', () => {
  it('should render correct contents', () => {
    const vm = Util.createVue(paySuccess);
    expect(vm.$el.querySelector('.mt').innerText).to.equal('报名成功，请点击来学宝典app进行学习');
  });
});