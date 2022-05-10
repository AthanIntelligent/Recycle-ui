<template>
  <trade-list />
</template>

<script>
import TradeList from './components/TradeList'
export default {
  name: "index",
  components: {TradeList},
  data() {
    return {}
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: auto;
  background-color: white;
  padding:20px;

}
</style>
