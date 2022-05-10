<template>
	<div class="div">

		<div class="divbody1" style="position: relative;">
		</div>
<!--		<div style="width: 100%;text-align: center;margin-top: 20px;">-->
<!--			<img src="../assets/images/2ee04e32c5ce1bb1b6e8f716ef1ef6f.png"/>-->
<!--		</div>-->
	</div>
</template>

<script>
import {toPay} from "@/api/alipay";
	export default {
		name: "",
		data() {
			return {
        totalAmount:'',
				goodsInfo: [],
        reservationInfo: {}
			};
		},
		created() {
			this.totalAmount = this.$route.query.totalAmount;
			this.goodsInfo = this.$route.query.goodsInfo;
      this.reservationInfo = this.$route.query.reservationInfo

      console.log(this.totalAmount+","+this.goodsInfo)
			this.getData();
		},
		methods: {
			isClude(goodsName,currname){
				var names = goodsName.split(" ");
				for(var i=0;i<names.length;i++){
					if(names[i] == currname){
						return true;
					}
				}
				return false;
			},

			getData:function(){
        toPay(this.goodsInfo,this.reservationInfo)
        .then(response => {
          console.log(response.data);
          let divForm = document.getElementsByTagName('divbody1');
          if (divForm.length) {
            document.body.removeChild(divForm[0]);
          }
          const div = document.createElement('divform');
          div.innerHTML = response.data; // res.data就是sb支付宝返回给你的form
          document.body.appendChild(div);
          document.getElementsByName('punchout_form')[0].submit();
        }).catch(error => {
          console.log(error)
        })
				// this.$axios.post("/api/pay/alipay",{goodsInfo:this.goodsInfo,reservationInfo:this.reservationInfo}
				// ).then(response => {
				// 	console.log(response.data);
				// 		let divForm = document.getElementsByTagName('divbody1');
				// 		if (divForm.length) {
				// 			document.body.removeChild(divForm[0]);
				// 		}
				// 		const div = document.createElement('divform');
				// 		div.innerHTML = response.data; // res.data就是sb支付宝返回给你的form
				// 		document.body.appendChild(div);
				// 		document.getElementsByName('punchout_form')[0].submit();
				// 	}).catch(error => {
				// 	console.log(error)
				// 	})

			}
		}
	};
</script>
<style scoped>
	.divbody1{
		width: 450px;
		height: 430px;
		background-color: white;

		margin:auto ;
		text-align: center;
		padding-top: 20px;

	}
</style>
