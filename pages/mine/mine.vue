<template>
	<view class="mine_page">
		<view class="color_fill_c6b089"></view>
		<view class="color_fill_f6f2e6">
			<view class="login_in">
				<text style="font-size: 15px; ">登录</text>
			</view>
			<view class="mine_list" style="padding-bottom: 160px;">
				<view class="mine_list_li" v-for="item in mine_list_li" :key="item">
					<text style="font-size: 13px; letter-spacing:0.5px"> {{item}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mine_list_li:["我的信息","我的发布","消息通知","关于我们","写给小艺"]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.mine_page{
	height: auto;
	background-color: #c6b089;
	font-family:‘Courier New’, Courier, monospace;
	font-weight: 600 !important;
	.color_fill_c6b089{
		height: 10px;
		background-color: #c6b089;
		
	}
	.color_fill_f6f2e6{
		border-radius: 20px 20px 0 0;
		height: auto;
		background-color: #f6f2e6;
		.login_in{
			padding-top: 30px;
			
			height: 50px;
			
			padding-left: 60px;
			
		}
		.mine_list_li{
			padding-top: 11px;
			padding-left: 40px;
			padding-bottom: 11px;
			border-bottom: 1px solid #d6d6d6;
		}
	}
	
}
</style>
