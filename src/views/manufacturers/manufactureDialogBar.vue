<template>
  <div>
    <el-form ref="form" :model="manufacturers" label-width="80px">
      <div style="display: flex">
        <el-form-item label="厂商名称">
          <el-input v-model="manufacturers.factureName" style="width: 260px" type="text" ></el-input>
        </el-form-item>
        <el-form-item label="厂商电话">
          <el-input v-model="manufacturers.facturePhone" style="width: 230px" type="phone" flex="1"></el-input>
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item label="厂商地址" label-width="80px" placeholder="请选择基站地址">
          <el-cascader
            style="width: 100%"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址"  label-width="80px">
          <el-input type="text"
                    style="width: 340px"
                    v-model="address2"
                    maxlength="50" />
        </el-form-item>
      </div>

      <el-form-item label="回收物品">
        <div class="recycleDiv" >
          <div v-for="goods in goodsInfo">
            <el-checkbox :indeterminate="goods.isIndeterminate" v-model="goods.checkAll" @change="handleCheckAllChange(goods)">{{ goods.goodsType }}</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange(goods)">
              <el-checkbox v-for="name in goods.goodsName" :label="name" :key="name">{{name}}</el-checkbox>
            </el-checkbox-group>
            <hr />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="设置单价" v-if="goodsNameAndPrice.length>0">
        <div class="recycleDiv">
          <div >
            <div v-for="goodsAndPrice in goodsNameAndPrice" style="float: left;margin-bottom: 5px" >
              <span>【{{goodsAndPrice.goodsName}}】</span>
              <el-input v-model="goodsAndPrice.price" type="number" style="width: 120px;" placeholder='请输入单价'></el-input>
              <el-select v-model="goodsAndPrice.unit" :value="goodsAndPrice.unit" placeholder="请选择单位">
                <el-option value="个">个</el-option>
                <el-option value="克">克</el-option>
                <el-option value="千克">千克</el-option>
                <el-option value="吨">吨</el-option>
              </el-select>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div>
          <el-button type="button" plain size="small" @click="cancelFacture">取消</el-button>
          <el-button type="primary" @click="addManufacture">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {CodeToText, regionData} from "element-china-area-data";
import {addManufacture} from "@/api/manufacture"
export default {
  name: "manufactureDialogBar",
  props:{
    goodsList:[]
  },
  data(){
    return{
      manufacturers:{
        facturePhone:'',
        factureName:'',
        recycleGoodsAndPrice:'',
        factureAddress:''
      },
      options: regionData,
      selectedOptions: [],
      address1:'',
      address2:'',
      goodsInfo:[],
      goodsNameAndPrice:[],
      checkedCities:[],
      ch:0
    }
  },
  methods:{
    handleChange() {
      var loc = "";
      for(let i=0;i<this.selectedOptions.length;i++){
        loc += CodeToText[this.selectedOptions[i]];
      }
      this.address1 = loc;
    },
    handleCheckAllChange(val){

      let goods = JSON.parse(JSON.stringify(val))
      console.log(goods)
      console.log(this.checkedCities,777)
      if(goods.checkAll){
        for(var i=0;i<goods.goodsName.length;i++){
          if(this.checkedCities.length===0){
              this.checkedCities.push(goods.goodsName[i])
          }else{
            for(var j=0;j<this.checkedCities.length;j++){
              if(this.checkedCities[j]===goods.goodsName[i]){
                continue;
              }
              if(j===this.checkedCities.length-1){
                this.checkedCities.push(goods.goodsName[i])
              }
            }
          }


        }
      }
      val.isIndeterminate = false;
      if(goods.checkAll){
        this.goodsNameAndPrice = []
        for(var i=0;i<this.checkedCities.length;i++){
          let gStr = {
            goodsName:'',
            price:null,
            unit:''
          };
          gStr.goodsName = this.checkedCities[i]
          // goodsNAP.push(gStr)
          this.goodsNameAndPrice.push(gStr)
        }
      }else{
          for(var i=0;i<goods.goodsName.length;i++){
            for(var j=0;j<this.goodsNameAndPrice.length;j++){
              if(this.goodsNameAndPrice[j].goodsName===goods.goodsName[i]){
                this.goodsNameAndPrice.splice(j,1);
              }
            }
            for(var j=0;j<this.checkedCities.length;j++){
              if(this.checkedCities[j]===goods.goodsName[i]){
                this.checkedCities.splice(j,1);
              }
            }
          }


      }

    },

    handleCheckedCitiesChange(value) {
      let goods = JSON.parse(JSON.stringify(value))
      goods.checkedCities.push(this.ch++)
      let checkedCount = goods.checkedCities[0]+1;
      value.checkAll = checkedCount === goods.goodsName.length;
      if(value.checkAll){
        this.ch = 0;
      }
      value.isIndeterminate = checkedCount > 0 && checkedCount < goods.goodsName.length;
      if(this.checkedCities.length>this.goodsNameAndPrice.length){
        let gStr = {
          goodsName:'',
          price:null,
          unit:''
        };
        gStr.goodsName = this.checkedCities[this.checkedCities.length-1]
        this.goodsNameAndPrice.push(gStr)
      }else{
        var k=0;
        for(var i=0;i<this.goodsNameAndPrice.length;i++){
          for(var j=0;j<this.checkedCities.length;j++){
            if(this.goodsNameAndPrice[i].goodsName===this.checkedCities[j]){
              continue;
            }
            if(j===this.checkedCities.length-1){
              k=i;
            }
          }
        }
        this.goodsNameAndPrice.splice(k,1);
      }


    },
    getGoodsInfo(){
      var goodsType = []
      if(this.$props.goodsList != null){
        let len = this.$props.goodsList.length;
        let goods =  this.$props.goodsList;
        var j=0;
        for(var i=0;i<len;i++){
          if(!goodsType.includes(goods[i].goodsType)){
            goodsType[j++] = goods[i].goodsType
          }
        }
        for(var k=0;k<goodsType.length;k++){
          var p = 0;
          let str = {
            goodsType:goodsType[k],
            checkAll:false,
            goodsName:[],
            checkedCities:[],
            isIndeterminate:true
          };
          for(var h=0;h<len;h++){
            if(goodsType[k]==goods[h].goodsType){
              str.goodsName[p++] = goods[h].goodsName;
            }
          }
          this.goodsInfo.push(str)
        }
      }
    },
    addManufacture(){
      if(this.manufacturers.factureName.toString().trim()===''|| this.manufacturers.factureName == null){
        this.accountTip('warning','提示','请填写厂商名称')
        return;
      }
      if(this.manufacturers.facturePhone.toString().trim()===''|| this.manufacturers.facturePhone == null){
        this.accountTip('warning','提示','请填写厂商电话')
        return;
      }
      if(this.address1.toString().trim() === '' || this.address1 == null){
        this.accountTip('warning','提示','请选择厂商所在城市')
        return;
      }
      if(this.address2.toString().trim() === '' || this.address2 == null){
        this.accountTip('warning','提示','请填写详细地址')
        return;
      }
      this.manufacturers.factureAddress = this.address1+this.address2;
      this.manufacturers.recycleGoodsAndPrice = ''
      for(var i=0;i<this.goodsNameAndPrice.length;i++){
        if(this.goodsNameAndPrice[i].price == null || this.goodsNameAndPrice[i].unit.toString().trim()===''){
          this.accountTip('warning','提示','设置定价请填写完善')
          return;
        }
        if(i!=this.goodsNameAndPrice.length-1){
          this.manufacturers.recycleGoodsAndPrice+=this.goodsNameAndPrice[i].goodsName+','+this.goodsNameAndPrice[i].price+','+this.goodsNameAndPrice[i].unit+';';
        }else{
          this.manufacturers.recycleGoodsAndPrice+=this.goodsNameAndPrice[i].goodsName+','+this.goodsNameAndPrice[i].price+','+this.goodsNameAndPrice[i].unit
        }
      }
      addManufacture(this.manufacturers).then(res => {
        if(res.data.status==200){
          this.accountTip('success','成功','添加成功')
          this.cancelFacture();
        }
      }).catch(err => {
        this.accountTip('error','失败',err.message)
        this.cancelFacture();
      })
    },
    cancelFacture(){
      this.$emit('cancelFacture',true)
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
    }
  },
  mounted() {
    this.getGoodsInfo();


  }
}
</script>

<style scoped>
.recycleDiv{
  width: 100%;
  height: 260px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding:5px;
}
</style>
