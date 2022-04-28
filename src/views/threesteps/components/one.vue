<template>
  <div class="app-container">
    <div class="oneClass">
      <el-form :model="station" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="基站名称" prop="name" placeholder="请输入基站名称">
          <el-input v-model="station.stationName"></el-input>
        </el-form-item>
        <el-form-item label="基站地址" prop="address" placeholder="请选择基站地址">
          <el-input v-model="station.stationAddress"></el-input>
        </el-form-item>
        <el-form-item label="经营物品" prop="type">
          <el-checkbox-group v-model="checkedLists"  @change="handleCheckedCitiesChange" >
            <div v-for="goodsall in goodsAllList">
              <el-button type="text" plain>{{goodsall.goodsType}}:</el-button>
              <el-checkbox v-for="goods in goodsall.goodsList" :label="goods.uuid"  :key="goods.uuid" :value="goods.uuid">{{goods.goodsName}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">注册基站</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getGoodsTypeAndGoods} from '@/api/goods'
import {addStation} from '@/api/station'
export default {
  name: "one",
  data() {
    return {
      flag:null,
      station: {
        uuid: null,
        stationName: null,
        stationAddress: null,
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
        name: [
          { required: true, message: '请输入基站名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入基站地址', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个经营物品类型', trigger: 'change' }
        ]
      }
    };
  },
  created() {
    this.getAllGoodsTypeAndGoods();
  },
  methods: {
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
      console.log(value)
    },
    submitForm() {
      let goodsIds = "";
      for (let i=0;i<this.checkedLists.length;i++){
        if (i==this.checkedLists.length-1){
          goodsIds += this.checkedLists[i]
        }else {
          goodsIds += this.checkedLists[i]+","
        }
      }
      this.oneSubmitData.station = this.station;
      this.oneSubmitData.goodsIds = goodsIds;
      addStation(this.oneSubmitData).then((res) => {
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
    resetForm() {
      this.station.stationName = null,
      this.station.stationAddress = null,
      this.checkedLists = []
    }
  },
  mounted() {

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
