<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="goods.uuid==''">
    <el-form-item label="物品名称" prop="name">
      <el-input v-model="ruleForm.goodsName"></el-input>
    </el-form-item>
    <el-form-item label="物品类型" prop="type">
      <el-select v-model="ruleForm.goodsType" placeholder="请选择物品类型">
        <el-option label="可回收垃圾" value="shanghai"></el-option>
        <el-option label="可循环利用垃圾" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="简介" prop="desc">
      <el-input type="textarea" v-model="ruleForm.recycleDetail"></el-input>
    </el-form-item>
    <el-form-item label="单价" prop="price">
      <el-input type="text" v-model="ruleForm.perMoney"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="img">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="afterUpload"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
  </el-form>
  <el-form :model="goods" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-else>
    <el-form-item label="物品名称" prop="name">
      <el-input v-model="goods.goodsName"></el-input>
    </el-form-item>
    <el-form-item label="物品类型" prop="type">
      <el-select v-model="goods.goodsType" placeholder="请选择物品类型">
        <el-option label="可回收垃圾" value="shanghai"></el-option>
        <el-option label="可循环利用垃圾" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="简介" prop="desc">
      <el-input type="textarea" v-model="goods.recycleDetail"></el-input>
    </el-form-item>
    <el-form-item label="单价" prop="price">
      <el-input type="text" v-model="goods.perMoney"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="text" v-model="goods.remark"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="img">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="afterUpload"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'goodsDialogBar',
  props: {
    goods: {
      uuid: '',
      goodsType: '',
      goodsName: '',
      pic: Object,
      recycleDetail: '',
      perMoney: 0,
      remark: ''
    }
  },
  data() {
    return {
      ruleForm: {
        uuid: '',
        goodsType: '',
        goodsName: '',
        pic: Object,
        recycleDetail: '',
        perMoney: 0,
        remark: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入物品名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        type: [
          {type: 'array', required: true, message: '请选择物品类型', trigger: 'change'}
        ],
        img: [
          {required: true, message: '请选择图片', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请填写简介', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    afterUpload(file) {
      console.log(file)
      this.data.img = file
    }
  }
}
</script>
<style scoped>

</style>
