<template>
  <div>
    <fu-head title="选课"></fu-head>
    <div class="majors-main">
      <div class="majors-category">
        <text class="majors-title">报考类别</text>
        <fu-selector
          :optionData="categoryOptionData"
          :sText="categoryText ? categoryText : text"
          @overlayBottomClick="categoryBottomClick"
        ></fu-selector>
      </div>
      <div class="majors-profession">
        <text class="majors-title">报考专业</text>
        <fu-selector
          :optionData="professionOptionData"
          :sText="professionText ? professionText : text"
          @overlayBottomClick="professionBottomClick"
          :disabled="disabled"
        ></fu-selector>
        <fu-selector
          class="profession-child"
          :optionData="professionChildOptionData"
          :sText="professionChildText ? professionChildText : text"
          @overlayBottomClick="professionChildBottomClick"
          :disabled="professionChildDisabled"
          v-if="professionChildShow"
        ></fu-selector>
      </div>
      <div class="majors-subject" v-if="isSubject">
        <text class="majors-title">报考科目</text>
        <wxc-checkbox-list
          :list="subjectData"
          :config="config"
          @wxcCheckBoxListChecked="wxcCheckBoxListChecked"
        ></wxc-checkbox-list>
      </div>
      <wxc-button
        text="提交"
        size="medium"
        type="blue"
        class="majors-btn"
        @click="submit"
      ></wxc-button>
      <wxc-dialog
        title="提示信息"
        :content="dialogContent"
        :show="show"
        :single="true"
        main-btn-color="#009ff0"
        @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked"
      >
      </wxc-dialog>
    </div>
  </div>
</template>

<script>
import { WxcCheckboxList, WxcButton, WxcDialog } from 'weex-ui';
import { StaticUrl } from '@/assets/utils/constants';

export default{
  data() {
    return {
      categoryOptionData: [],
      professionOptionData: [],
      professionChildOptionData: [],
      subjectData: [],
      categoryText: '',
      categoryId: '',
      // profession name
      professionText: '',
      // profession children name
      professionChildText: '',
      text: '请选择...',
      disabled: true,
      professionChildDisabled: true,
      // controls whether professionChild apear
      professionChildShow: true,
      subjectIds: [],
      isSubject: false,
      professionId: '',
      config: {
        checkedIcon: StaticUrl + '/TB14fp2pwMPMeJjy1XbXXcwxVXa-72-72.png',
        checkedColor: '#009ff0'
      },
      show: false,
      dialogContent: '',
      isContract: '',
    }
  },
  mounted() {
    this.getCategoryData();
    this.hasContractToCategory()
  },
  methods: {
    async getCategoryData() {
      let result = await this.$http.get({
        name: 'category.index',
        data: {
          refid: 0,
          flag: 'y',
        },
      });
      if (result) {
        this.categoryOptionData = result.items;
      }
    },
    async hasContractToCategory() {
      this.isContract = await this.getContract();
      if (this.isContract) {
        let res = await this.$http.get({
          name: 'category.index',
          data: {
            refid: 0,
            expand: 'children',
          },
        })
        res.items.forEach((item, index) => {
          const i = item.children.filter(data => data.id === this.isContract.category_id)
          if (i.length) {
            this.categoryText = res.items[index].name;
            this.professionText = i[0].name;
            this.disabled = false;
            this.professionOptionData = res.items[index].children;
            this.getprofessionChildData(this.isContract.category_id);
            this.professionChildDisabled = false;
          }
        })
      }
    },
    getprofessionData(refid) {
      this.$http.get({
        name: 'category.index',
        data: {
          refid: refid,
          flag: 'y',
        },
      }).then((data) => {
        this.professionOptionData = data.items;
        if (this.subjectData) {
          this.subjectData = []
        }
      })
    },
    getprofessionChildData(cid) {
      this.$http.get({
        name: 'major-subject',
        data: {
          cid: cid
        },
      }).then((data) => {
        if (data.items.length === 1) {
          this.professionChildShow = false;
          this.professionId = data.items[0].category_id;
          this.getsubjectData(data.items[0].id);
          this.isSubject = true;
        } else {
          this.professionChildOptionData = data.items;
          this.professionChildShow = true;
          this.subjectData = [];
        }
      })
    },
    getsubjectData(refid) {
      this.$http.get({
        name: 'major-subject',
        data: {
          refid: refid
        },
      }).then((data) => {
        if (data) {
          this.subjectData = []
          if (!this.subjectData.length) {
            data.items.forEach(val => {
              this.subjectData.push({
                title: `${val.name}(￥${val.price})`,
                value: val.id
              })
            });
          }
        }
      })
    },
    categoryBottomClick(i) {
      if (this.isContract && (i.name !== this.categoryText)) {
        this.show = true;
        this.dialogContent = '协议已存在，请选择正确的报考类别和报考专业，只支持修改专业子类和科目';
      } else {
        if (this.disabled) {
          this.categoryText = i.name;
          this.categoryId = i.id
          this.getprofessionData(i.id);
          this.disabled = false;
        } else {
          this.professionText = this.text;
          this.categoryText = i.name;
          this.categoryId = i.id;
          this.getprofessionData(i.id);
          this.isSubject = false;
          if (!this.professionChildDisabled) {
            this.professionChildText = this.text;
            this.professionChildDisabled = true;
          }
        }
      }
    },
    async professionBottomClick(i) {
      const isContract = await this.getContract();
      if (isContract && i.id !== isContract.category_id) {
        this.show = true;
        this.dialogContent = '协议已存在，请选择正确的报考类别和报考专业，只支持修改专业子类和科目';
      } else {
        if (this.professionChildDisabled) {
          this.professionText = i.name;
          this.getprofessionChildData(i.id);
          this.professionChildDisabled = false;
        } else {
          this.professionChildText = this.text;
          this.professionText = i.name;
          this.getprofessionChildData(i.id);
          this.isSubject = false;
        }
      }
    },
    professionChildBottomClick(i) {
      this.professionChildText = i.name;
      this.professionId = i.category_id;
      this.getsubjectData(i.id);
      this.isSubject = true;
    },
    wxcCheckBoxListChecked(e) {
      this.subjectIds = e.checkedList;
    },
    submit() {
      this.createContact();
    },
    async createContact() {
      const isCreateContract = await this.getContract();
      const result = await this.$storage.getJSON('user');
      if (!isCreateContract) {
        if (this.subjectIds.length && this.professionId) {
          let subjectIds = this.subjectIds.join(',');
          let createCotract = await this.contract('post', result, 'create-contract', subjectIds, this.professionId, result.id);
          this.$loc.open(`/contract/${createCotract.id}/preview`);
        } else {
          this.show = true;
          this.dialogContent = '报考专业和报考科目必选';
        }
      } else {
        if (this.subjectIds.length && this.professionId) {
          let subjectIds = this.subjectIds.join(',');
          let updateCotract = await this.contract('put', result, 'update-contract', subjectIds, this.professionId, isCreateContract.id);
          this.$loc.open(`/contract/${updateCotract.id}/preview`);
        } else {
          this.show = true;
          this.dialogContent = '报考专业和报考科目必选';
        }
      }
    },
    contract(method, result, name, subject_ids, category_id, id) {
      return new Promise((resolve, reject) => {
        Object.keys(this.$http).forEach(item => {
          if (item === method) {
            let func = this.$http[method];
            func({
              headers: {
                'Authorization': 'Bearer ' + result.token,
              },
              name: name,
              params: {
                id: id
              },
              data: {
                subject_ids: subject_ids,
                category_id: category_id,
              }
            }).then(data => {
              if (data) {
                resolve(data)
              } else {
                reject('no data!')
              }
            });
          }
        })
      })
    },
    async getContract(name) {
      const result = await this.$storage.getJSON('user');

      const contract = await this.$http.get({
        headers: {
          'Authorization': 'Bearer ' + result.token
        },
        name: 'user-contract.index',
        params: {
          id: result.id
        }
      });
      return contract;
    },
    wxcDialogConfirmBtnClicked() {
      this.show = false
    }
  },
  components: {
    WxcCheckboxList,
    WxcButton,
    WxcDialog,
    'fu-head': () => import('@components/layouts/fu-head'),
    'fu-selector': () => import('@components/commons/fu-selector')
  }
}
</script>

<style scoped>
.majors-main {
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.majors-title {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 40px;
}
.profession-child {
  margin-top: 20px;
}
.majors-subject {
  width: 700px;
}
.majors-btn {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
