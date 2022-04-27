<template>
  <el-form :model="goodsType" ref="goodsType" label-width="100px" class="demo-ruleForm" v-if="goodsType.uuid==''">
    <el-form-item
      label="物品类型"
      prop="goodsType"
      required
      :rules="[
        { required: true, message: '物品类型不能为空'},
        {min: 1, message: '长度不能小于1个字符', trigger: 'blur'}
      ]">
      <el-input type="text" v-model="goodsType.goodsType" placeholder="请填写物品类型"/>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'goodsTypeDialogBar',
  props: {
    goodsType: {
      goodsType: ''
    }
  },
  data() {
    return {
      goodsType: {
        goodsType: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
