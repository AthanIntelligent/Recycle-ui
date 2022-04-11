<template>
  <el-form :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="goods.uuid==''">
    <el-form-item label="物品名称" prop="goodsName">
      <el-input v-model="goods.goodsName"></el-input>
    </el-form-item>
    <el-form-item label="物品类型" prop="goodsType">
      <el-select v-model="goods.goodsType" placeholder="物品类型">
        <el-option v-for="item in goodsTypeList" :key="item.uuid" :value="item.goodsType"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="简介" prop="recycleDetail">
      <el-input type="textarea" v-model="goods.recycleDetail"></el-input>
    </el-form-item>
    <el-form-item label="单价" prop="perMoney">
      <el-input type="text" v-model="goods.perMoney"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="text" v-model="goods.remark"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="pic">
      <el-upload
        class="upload-demo"
        :action="'http://localhost:8082/goods/pic'"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="afterUpload"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
  </el-form>
  <el-form :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-else  size="medium">
    <el-form-item label="物品名称" prop="goodsName">
      <el-input v-model="goods.goodsName"></el-input>
    </el-form-item>
    <el-form-item label="物品类型" prop="goodsType">
      <el-select v-model="goods.goodsType" placeholder="物品类型">
        <el-option v-for="item in goodsTypeList" :key="item.uuid" :value="item.goodsType"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="简介" prop="recycleDetail">
      <el-input type="textarea" v-model="goods.recycleDetail"></el-input>
    </el-form-item>
    <el-form-item label="单价" prop="perMoney">
      <el-input type="text" v-model="goods.perMoney"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="text" v-model="goods.remark"></el-input>
    </el-form-item>
<!--  目前图片不能修改  -->
<!--    <el-form-item label="图片（修改）" prop="pic">-->
<!--      <template slot-scope="scope">-->
<!--        <img :src='path+scope.row.pic' alt="" width="50%">-->
<!--      </template>-->
<!--    </el-form-item>-->
  </el-form>
</template>
<script>
import {dirGoodsType} from '@/api/goodstype'
export default {
  name: 'goodsDialogBar',
  props: {
    goods: {
      uuid: '',
      goodsType: '',
      goodsName: '',
      pic: '',
      recycleDetail: '',
      perMoney: null,
      remark: ''
    }
  },
  data() {
    return {
      ruleForm: {
        uuid: '',
        goodsType: '',
        goodsName: '',
        pic: '',
        recycleDetail: '',
        perMoney: null,
        remark: ''
      },
      goodsTypeList: [],
      path: "/static/image/goodImg/",
      rules: {
        goodsName: [
          {required: true, message: '请输入物品名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        goodsType: [
          {type: 'array', required: true, message: '请选择物品类型', trigger: 'change'}
        ]
      }
    }
  },
  created() {
    this.getAllGoodsType()
  },
  methods: {
    getAllGoodsType() {
      dirGoodsType().then((res) => {
        if (res.data.status === 200) {
          this.goodsTypeList = res.data.data
        }
      }).catch((res) => {
        console.log(res.message)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    afterUpload(response) {
      console.log(response.data)
      this.goods.pic = response.data
      console.log(this.goods.pic)
    }
  }
}
</script>
<style scoped>

</style>
