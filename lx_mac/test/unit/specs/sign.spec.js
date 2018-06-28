import sign from '@/contract/sign';
import { expect } from 'chai';
import Util from '../util';

describe('sign.vue', () => {
  const vm = Util.createVue(sign);
  it('should render correct button text', () => {
    expect(vm.$el.querySelector('.signBotton').innerText).to.equal('确定预签约');
  });
});
