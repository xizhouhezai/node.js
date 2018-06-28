<template>
  <div>
    <fu-head title="协议预览"></fu-head>
    <div class="contract-preview">
      <text class="contract-title">{{contractTitle}}</text>
      <scroller class="scroller" show-scrollbar="true">
        <text class="contract-content" v-html="content"></text>
      </scroller>
      <div class="preview-bottom">
        <wxc-checkbox
          class="preview-checkbox"
          title="已阅读并同意协议"
          :config="config"
          :checked="isChecked"
          :has-bottom-border="false"
          @wxcCheckBoxItemChecked="wxcCheckBoxItemChecked"
        ></wxc-checkbox>
        <wxc-button
          text="提交"
          size="medium"
          type="blue"
          class="preview-btn"
          @wxcButtonClicked="submit"
          :disabled="!isChecked"
        ></wxc-button>
      </div>
    </div>
  </div>
</template>

<script>
import { WxcCheckbox, WxcButton } from 'weex-ui'
import { StorageKey, StaticUrl } from '../assets/utils/constants';

export default {
  data() {
    return {
      contractTitle: '',
      content: '',
      isChecked: true,
      config: {
        checkedIcon: StaticUrl + '/TB14fp2pwMPMeJjy1XbXXcwxVXa-72-72.png',
        checkedColor: '#009ff0'
      },
    }
  },
  mounted() {
    this.getContract();
  },
  methods: {
    async getContract() {
      const result = await this.$storage.getJSON(StorageKey.USER);
      const contract = await this.$http.get({
        headers: {
          'Authorization': 'Bearer ' + result.token,
        },
        name: 'contract-preview',
        params: {
          id: this.$context.params.id,
        },
        data: {
          expand: 'content,subjects,category,site',
        }
      })
      if (contract) {
        this.contractTitle = contract.title;
        let {netSchool, category, subjects} = contract.Expand;
        this.setSubjectStorage(subjects);
        let table = `<table style="border: 1px solid #eee; width: 100%; margin-top: 10px;">
            <tr>
              <td style="border: 1px solid #eee;">考试</td>
              <td style="border: 1px solid #eee;">科目</td>
              <td style="border: 1px solid #eee;">单价(元)</td>
              <td style="border: 1px solid #eee;">合计(元)</td>
            </tr>
        `;
        
        let sum = 0;
        subjects.forEach(item => {
          sum += parseInt(item.price);
        })
        table += `<tr>
          <td rowspan="${subjects.length}" style="border: 1px solid #eee;">${category.name}</td>
          <td style="border: 1px solid #eee;">${subjects[0].name}</td>
          <td style="border: 1px solid #eee;">￥${subjects[0].price}.00</td>
          <td rowspan="${subjects.length}" style="border: 1px solid #eee;">￥${sum}.00</td>
        </tr>`;
        
        subjects.slice(1, subjects.length).forEach(item => {
          table += `
            <tr>
              <td style="border: 1px solid #eee;">${item.name}</td>
              <td style="border: 1px solid #eee;">￥${subjects[0].price}.00</td>
            </tr>
          `;
        })
        table += `<table>`;
       
        const obj = {site: netSchool.name, category: category.name, subjects: table};
        this.content = this.format(contract.Expand.content.Content, obj);
      }
    },
    setSubjectStorage(subject) {
      this.$storage.setJSON('subjects', subject)
    },
    format(sub, obj) {
      let temp = sub;
      Object.keys(obj).forEach(item => {
        temp = temp.replace('{' + item + '}', obj[item]);
      })
      return temp;
    },
    wxcCheckBoxItemChecked() {
      this.isChecked = !this.isChecked;
    },
    submit(e) {
      if (e.disabled) return;
      this.$loc.open(`/contract/${this.$context.params.id}/sign`);
    },
  },
  components: {
    WxcCheckbox,
    WxcButton,
    'fu-head': () => import('@components/layouts/fu-head'),
  }
}
</script>

<style scoped>
.contract-preview {
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.scroller {
  width: 650px;
  height: 900px;
  padding: 0 10px;
  margin-top: 30px;
  border-width: 1px;
  border-style: solid;
  border-color: #eeeeee;
}
.preview-bottom {
  width: 500px;
  justify-content: center;
  align-items: center;
}
.preview-checkbox {
  width: 400px;
}
</style>
