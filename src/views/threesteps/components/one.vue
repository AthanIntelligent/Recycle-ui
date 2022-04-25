<template>
  <div class="app-container">
    <el-form :model="station" :rules="rules" ref="ruleForm" label-width="100px" class="oneClass">
      <el-form-item label="基站名称" prop="name" placeholder="请输入基站名称">
        <el-input v-model="station.stationName"></el-input>
      </el-form-item>
      <el-form-item label="基站地址" prop="region" placeholder="请选择基站地址">
        <el-input v-model="station.stationAddress"></el-input>
      </el-form-item>
      <el-form-item label="经营物品类型" prop="type">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChangeB">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="typeOptions"   @change="handleCheckedCitiesChangeB">
          <el-checkbox v-for="goodsType in goodsTypeList" :label="goodsType.goodsType" @change="handleCheckedCitiesChangeB(goodsType)" :key="goodsType.uuid" :value="goodsType.uuid">{{goodsType.goodsType}}</el-checkbox>
<!--          <el-checkbox v-for="goodsType in typeOptions" :label="goodsType" :key="goodsType">{{goodsType}}</el-checkbox>-->
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('station')">立即创建</el-button>
        <el-button @click="resetForm('station')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {dirGoodsType} from '@/api/goodstype'
import {addStation} from '@/api/station'
export default {
  name: "one",
  data() {
    return {
      station: {
        uuid: null,
        stationName: null,
        stationAddress: null,
      },
      selectType: [],
      goodsTypeList: [],
      typeOptions: [],
      checkAll: false,
      isIndeterminate: true
    };
  },
  created() {
    this.getAllGoodsTypeList()
  },
  methods: {
    getAllGoodsTypeList() {
      dirGoodsType().then((res) => {
        if (res.data.status === 200) {
            this.goodsTypeList = res.data.data
            console.log(JSON.parse(JSON.stringify(this.goodsTypeList)))
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    handleCheckAllChangeB(val) {
      this.goodsTypeList = val ? this.goodsTypeList : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChangeB(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.goodsTypeList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.goodsTypeList.length;
    },
    submitForm(station) {
      alert(123)
      addStation(station).then((res) => {
        if (res.data.status == 200) {
          this.$message.success("注册成功")
        }
        if (res.data.status != 200) {
          this.$message.success("注册失败")
        }
      }).catch((res) => {
        console.log(res.message)
      })
      // this.$refs[station].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
    resetForm(station) {
      this.$refs[station].resetFields();
    }
  }
}
</script>

<style scoped>
.oneClass{
  width: 500px;
  height: 300px;
  border:3px solid #00ac95;
}
</style>
