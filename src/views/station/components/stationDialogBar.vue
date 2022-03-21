<template>
  <el-form :model="station" :rules="rules" ref="goodsType" label-width="100px" class="demo-ruleForm"
           v-if="goodsType.uuid==''">
    <el-form-item label="基站名称" prop="type">
      <el-input type="text" v-model="station.type" placeholder="请填写物品类型"/>
    </el-form-item>
    <el-form-item label="基站法人" prop="include">
      <el-input type="text" v-model="station.include" placeholder="请填写类型包括的物品"></el-input>
    </el-form-item>
    <el-form-item label="基站地址" prop="include">
      <el-input type="text" v-model="station.include" placeholder="请填写类型包括的物品"></el-input>
    </el-form-item>
    <el-form-item label="基站图片" prop="include">
      <el-input type="text" v-model="station.include" placeholder="请填写类型包括的物品"></el-input>
    </el-form-item>
    <el-form-item label="开启状态" prop="include">
      <el-input type="text" v-model="station.include" placeholder="请填写类型包括的物品"></el-input>
    </el-form-item>
  </el-form>
  <el-form :model="station" :rules="rules" ref="goodsType" label-width="100px" class="demo-ruleForm"
           v-else>
    <el-form-item label="基站名称" prop="type">
      <el-input type="text" v-model="station.type" placeholder="请填写物品类型"/>
    </el-form-item>
    <el-form-item label="基站法人" prop="include">
      <el-input type="text" v-model="station.include" placeholder="请填写类型包括的物品"></el-input>
    </el-form-item>
    <el-form-item label="基站地址" prop="include">
      <el-input type="text" v-model="station.include" placeholder="请填写类型包括的物品"></el-input>
    </el-form-item>
    <el-form-item label="基站图片" prop="include">
      <el-input type="text" v-model="station.include" placeholder="请填写类型包括的物品"></el-input>
    </el-form-item>
    <el-form-item label="开启状态" prop="include">
      <el-input type="text" v-model="station.include" placeholder="请填写类型包括的物品"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'stationDialogBar',
  props: {
    station: {
      uuid: '',
      stationName: '1',
      legal: '2',
      address: '3',
      pic: '',
      createTime: '2022-03-16'
    }
  },
  data() {
    return {
      goodsType: {
        uuid: '',
        type: '',
        include: ''
      },
      rules: {
        type: [
          {required: true, message: '请选择物品类型', trigger: 'change'},
          {min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur'}
        ],
        include: [
          {required: true, message: '请填写类型包括的物品', trigger: 'blur'}
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
