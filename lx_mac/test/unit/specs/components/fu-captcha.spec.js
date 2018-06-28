import fuCaptcha from '@/assets/components/commons/fu-captcha';
import { expect } from 'chai';
import Util from '../../util';

describe('fuCaptcha.vue', () => {
  const vm = Util.createVue(fuCaptcha);
  it('should render correct captcha button text', () => {
    expect(vm.$el.querySelector('.captchaButton').innerText).to.equal('重新发送');
  });
});
