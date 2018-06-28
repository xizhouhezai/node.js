import enroll from '@/user/enroll';
import { expect } from 'chai';
import Util from '../util';

describe('enroll', () => {
  it('should render correct contents', () => {
    const vm = Util.createVue(enroll);
    
    expect(vm.$el.querySelector('.majors-category').innerText).to.equal('报考类别');
    expect(vm.$el.querySelector('.majors-profession').innerText).to.equal('报考专业');
    expect(vm.$el.querySelector('.majors-subject').innerText).to.equal('报考科目');
    expect(vm.$el.querySelector('.majors-btn').innerText).to.equal('提交');
  });
});