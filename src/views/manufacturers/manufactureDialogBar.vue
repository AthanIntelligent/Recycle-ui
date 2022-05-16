<template>
  <div>
    <el-form ref="form" :model="manufacturers" label-width="80px">
      <div style="display: flex">
        <el-form-item label="厂商名称">
          <el-input v-model="manufacturers.factureName" style="width: 330px" type="text"></el-input>
        </el-form-item>
        <el-form-item label="厂商电话">
          <el-input v-model="manufacturers.facturePhone" style="width: 330px" type="phone"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="厂商地址">
        <el-input v-model="manufacturers.factureAddress" style="width: 350px"></el-input>
      </el-form-item>
      <el-form-item label="回收物品">
        <div class="recycleDiv" >
          <div v-for="goods in goodsInfo">
            <el-checkbox :indeterminate="goods.isIndeterminate" v-model="goods.checkAll" @change="handleCheckAllChange(goods)">{{ goods.goodsType }}</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="goods.checkedCities" @change="handleCheckedCitiesChange(goods)">
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
              <el-select v-model="goodsAndPrice.unit" :value="goodsAndPrice.unit">
                <el-option value="kg">kg</el-option>
                <el-option value="g">g</el-option>
                <el-option value="个">个</el-option>
                <el-option value="吨">吨</el-option>
              </el-select>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
      goodsInfo:[],
      goodsNameAndPrice:[]
    }
  },
  methods:{
    handleCheckAllChange(val){
      let goods = JSON.parse(JSON.stringify(val))
      val.checkedCities = goods.checkAll ? goods.goodsName : [];
      val.isIndeterminate = false;
      if(goods.checkAll){
        for(var i=0;i<val.checkedCities.length;i++){
          let gStr = {
            goodsName:'',
            price:null,
            unit:''
          };
          gStr.goodsName = val.checkedCities[i]
          this.goodsNameAndPrice.push(gStr)
        }
      }else{
          console.log(goods,111)
          for(var i=0;i<goods.goodsName.length;i++){
            for(var j=0;j<this.goodsNameAndPrice.length;j++){
              if(this.goodsNameAndPrice[j].goodsName===goods.goodsName[i]){
                this.goodsNameAndPrice.splice(j,1);

              }
            }
          }


      }

    },
    handleCheckedCitiesChange(value) {
      let goods = JSON.parse(JSON.stringify(value))
      console.log(goods)
      let checkedCount = goods.checkedCities.length;
      value.checkAll = checkedCount === goods.goodsName.length;
      value.isIndeterminate = checkedCount > 0 && checkedCount < goods.goodsName.length;
      if(checkedCount>this.goodsNameAndPrice.length){
        let gStr = {
          goodsName:'',
          price:null,
          unit:''
        };
        gStr.goodsName = goods.checkedCities[goods.checkedCities.length-1]
        this.goodsNameAndPrice.push(gStr)
      }else{
        var k=0;
        for(var i=0;i<this.goodsNameAndPrice.length;i++){
          for(var j=0;j<checkedCount;j++){
            if(this.goodsNameAndPrice[i].goodsName===goods.checkedCities[j]){
              continue;
            }
            if(j===checkedCount-1){
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
      console.log(this.goodsInfo)
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
