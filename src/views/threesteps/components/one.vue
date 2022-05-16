<template>
  <div class="app-container">
    <div class="oneClass">
      <el-form :model="station" :rules="rules" ref="station" label-width="100px">
        <el-form-item label="基站名称" prop="stationName" placeholder="请输入基站名称">
          <el-input v-model="station.stationName" style="width: 80%"></el-input>
        </el-form-item>
<!--        <el-form-item label="基站地址" prop="stationAddress" placeholder="请选择基站地址">-->
<!--          <el-input v-model="station.stationAddress"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="所在城市" prop="stationAddress" label-width="100px" placeholder="请选择基站地址">
          <el-cascader
            style="width: 50%"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址"  label-width="100px">
          <el-input type="text"
                    style="width: 80%"
                    v-model="address2"
                    maxlength="50" />
        </el-form-item>
        <el-form-item label="经营物品" >
          <el-checkbox-group v-model="checkedLists"  @change="handleCheckedCitiesChange" >
            <div v-for="goodsall in goodsAllList">
              <el-button type="text" plain>{{goodsall.goodsType}}:</el-button>
              <el-checkbox  v-for="goods in goodsall.goodsList" :label="goods.uuid"  :key="goods.uuid" :value="goods.uuid">{{goods.goodsName}}</el-checkbox>
            </div>
            <span style="display: block;font-size: 12px;font-family: '新宋体';color: red;" v-show="goodsListShow">请至少选择一个经营物品类型</span>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 100%;display:flex;justify-content: center;margin-top: 20px">
      <el-button type="primary" @click="submitForm()"  plain>下一步</el-button>
    </div>
  </div>
</template>

<script>
import {getGoodsTypeAndGoods} from '@/api/goods'
import {addStation} from '@/api/station'
import {CodeToText, regionData} from "element-china-area-data";
export default {
  name: "one",
  data() {
    const validateStationName = (rule, value, callback) => {
      if (value == undefined || value == null || value.toString().trim() === "") {
        callback(new Error('请输入基站名称'))
      } else {
        callback()
      }
    }
    const validateStationAddress2 = (rule, value, callback) => {
      if (value == undefined || value == null || value.toString().trim() === "") {
        callback(new Error('请输入详细地址'))
      } else {
        callback()
      }
    }
    const validateTypeSelect = (rule, value, callback) => {
      console.log(value,"13")
      if (value == null || !value.length>0) {
        callback(new Error('请至少选择一个经营物品类型'))
      } else {
        callback()
      }
    }
    return {
      flag:null,
      station: {
        uuid: null,
        stationName: null,
        stationAddress: null,
        active: 1
      },
      goods: {},
      goodsAllList: [],
      goodsTypeList: [],
      checkedLists: [],
      isIndeterminate: true,
      oneSubmitData:{
        station:{},
        goodsIds:''
      },
      stationId: null,
      rules: {
        stationName: [
          { required: true, message: '请输入基站名称', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateStationName },
          { required: true, trigger: 'change', validator: validateStationName },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        stationAddress: [
          { required: true, message: '', trigger: 'blue' }
        ],
        address2:[
          { required: true, message: '', trigger: 'blur' }
        ]
      },
      goodsListShow:false,
      options: regionData,
      selectedOptions: [],
      address1:'',
      address2:''
    };
  },
  created() {
    this.getAllGoodsTypeAndGoods();
  },
  methods: {
    handleChange() {
      var loc = "";
      for(let i=0;i<this.selectedOptions.length;i++){
        loc += CodeToText[this.selectedOptions[i]];
      }
      this.address1 = loc;
    },
    getAllGoodsTypeAndGoods() {
      getGoodsTypeAndGoods().then((res) => {
        if (res.data.status === 200) {
            this.goodsAllList = res.data.data
            console.log(JSON.parse(JSON.stringify(this.goodsAllList)))
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    handleCheckedCitiesChange(value) {
      if(this.checkedLists.length<=0){
        this.goodsListShow = true
      }else{
        this.goodsListShow = false
      }
    },
    submitForm() {
      let goodsIds = "";
      if(this.station.stationName == undefined || this.station.stationName == null || this.station.stationName.toString().trim() === ""){
        this.accountTip('warning','提示','基站名称不能为空')
        return;
      }
      if(this.address1.toString().trim() === '' || this.address1 == null){
        this.accountTip('warning','提示','请选择基站所在城市')
        return;
      }
      if(this.address2.toString().trim() === '' || this.address2 == null){
        this.accountTip('warning','提示','请填写详细地址')
        return;
      }
      if(this.checkedLists.length<=0){
        this.goodsListShow = true
        return;
      }
      for (let i=0;i<this.checkedLists.length;i++){
        if (i==this.checkedLists.length-1){
          goodsIds += this.checkedLists[i]
        }else {
          goodsIds += this.checkedLists[i]+","
        }
      }
      this.station.stationAddress = this.address1+this.address2;
      this.oneSubmitData.station = this.station;
      this.oneSubmitData.goodsIds = goodsIds;
      addStation(this.oneSubmitData).then((res) => {
        console.log(res)
        if (res.data.status == 200) {
          this.stationId = res.data
          //把这个stationId像父组件传，用于最后的查看状态
          this.$message.success("注册成功")
          this.$emit('flagOne',true)
        }
        if (res.data.status != 200) {
          this.$message.success("注册失败")
        }
      }).catch((res) => {
        console.log(res.message)
      });

    },
    accountTip(type,title,info) {
      this.$notify({
        title: title,
        dangerouslyUseHTMLString: true,
        message: '<strong>提示：<i>'+info+'</i></strong>',
        type: type,
        position: 'top-right',
        offset: 150
      })
    },
    resetForm() {
      this.station.stationName = null,
      this.station.stationAddress = null,
      this.checkedLists = []
    }
  },
  mounted() {
    if(this.checkedLists.length<=0){
      this.goodsListShow = true
    }
  }
}
</script>

<style scoped>
.oneClass{
  border:2px solid #00ac95;
  padding: 15px;
  width: auto;
}
</style>
