import Vue from 'vue';
import selector from '@/assets/components/commons/fu-selector';
import { expect } from 'chai';

function getRenderedText (Component, propsData) {
  const Constructor = Vue.extend(Component);
  const vm = new Constructor({ propsData: propsData }).$mount();
  return vm.$el.textContent;
}

describe('selector', () => {
  it('renders correctly with different props', () => {
    expect(getRenderedText(selector, {stext: ''})).to.equal('');
    expect(getRenderedText(selector, {optionData: ''})).to.equal('');
    expect(getRenderedText(selector, {disabled: ''})).to.equal('');
  });
});