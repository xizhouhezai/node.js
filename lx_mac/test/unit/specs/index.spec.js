import enroll from '@/enroll';
import { expect } from 'chai';
import Util from '../util';

describe('enroll.vue', () => {
  const vm = Util.createVue(enroll);
  it('should render correct contents', () => {
    expect(vm.$el.querySelector('.heading').innerText).to.equal('来学机构报名系统');
  });
});
