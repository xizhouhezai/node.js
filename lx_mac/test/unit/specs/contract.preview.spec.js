import preview from '@/contract/preview';
import { expect } from 'chai';
import Util from '../util';

describe('preview', () => {
  it('should render correct contents', () => {
    const vm = Util.createVue(preview);
    expect(vm.$el.querySelector('.preview-checkbox').innerText).to.equal('已阅读并同意协议');
    expect(vm.$el.querySelector('.preview-btn').innerText).to.equal('提交');
  });
});