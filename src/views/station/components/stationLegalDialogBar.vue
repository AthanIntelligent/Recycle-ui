<template>
  <div class="app-container">
    <el-descriptions class="margin-top" title="基站法人信息" :column="1" size="medium " border
                     style="margin-top: 20px;color: palevioletred">
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        <el-table-column>
          <span>{{ userRight.realName }}</span>
        </el-table-column>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          身份证号
        </template>
        <span>{{ userRight.id }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        <span>{{ userRight.mobile }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          年龄
        </template>
        <span>{{ userRight.age }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          性别
        </template>
        <span>{{ userRight.sex }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          注册时间
        </template>
        <el-tag size="small"><span>{{ userRight.createTime }}</span></el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        <span>{{ userRight.address }}</span>
      </el-descriptions-item>

    </el-descriptions>
    <el-card class="box-card" style="margin-top: 100px">
      <div slot="header" class="clearfix" style="color: palevioletred;font-size: 16px;font-weight:bold;">
        <span>基站经营物品</span>
      </div>
      <div v-for="goods in goodsTypeAndGoodsListRight" :key="goods" class="text item">
        <el-button type="text" plain style="margin-bottom: 3px">{{ goods.goodsType }}</el-button>
        <el-checkbox-group v-model="goods.goodsList">
          <el-checkbox v-for="good in goods.goodsList" :label="goods.uuid" :key="goods.uuid" :value="goods.uuid">
            {{ good.goodsName }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "stationLegalDialogBar",
  props: {
    userRight: {
      realName: null,
      id: null,
      sex: null,
      age: null,
      mobile: null,
      address: null,
      createTime: null
    },
    goodsTypeAndGoodsListRight: []
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: auto;
}
</style>
