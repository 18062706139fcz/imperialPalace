<template>
	<view class="creativity_IP_page"> 
		<view class="creativity_img_li" v-for="(item,index) in creativity_img_li" :key="item.text1">
			<view class="img_view">
				<image :src="item.img" style="height: 300rpx; width: 600rpx;">
				</image>
				<image @click="change_like(index)" class="creativity_img_like" :src="item.heart_like?'https://www.rykerfeng.cn/travel2/image/explore_imgs/heart_red.png':'https://www.rykerfeng.cn/travel2/image/explore_imgs/heart.png'" ></image>
			</view>
			
			<view style="font-weight: 600 !important; font-family:‘Courier New’, Courier, monospace; color: white; font-size: 30rpx;">{{item.text1}}</view>
			<view style="color:#dadada; font-size: 25rpx;">{{item.text2}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				creativity_img_li:[{
					img:"https://www.rykerfeng.cn/travel2/image/explore_imgs/red_magnolia.png",
					text1:"木兰红色版本（名字）",
					text2:"其他说明",
					heart_like:0
				},{
					img:"https://www.rykerfeng.cn/travel2/image/explore_imgs/blue_magnolia.png",
					text1:"木兰蓝色版本（名字）",
					text2:"其他说明",
					heart_like:0
				},{
					img:"https://www.rykerfeng.cn/travel2/image/explore_imgs/chickpeas.png",
					text1:"赤小豆 蕲春",
					text2:"其他说明",
					heart_like:0
				},{
					img:"https://www.rykerfeng.cn/travel2/image/explore_imgs/bohang.png",
					text1:"保康",
					text2:"其他说明",
					heart_like:0
				},],
				
			}
		},
		methods: {
			change_like(index) {
				this.creativity_img_li[index].heart_like=!this.creativity_img_li[index].heart_like;
			}
		}
	
	}
</script>

<style lang="scss" scoped>
	.creativity_IP_page{
		background-color: #3A5D55;
		height: auto;
		
		.creativity_img_li{
			padding-left: 75rpx;
			padding-bottom: 25rpx;
			padding-top: 25rpx;
			.img_view{
				height: 300rpx; 
				width: 600rpx;
				position: relative;
				.creativity_img_like{
					position: absolute;
					right: 25rpx;
					bottom: 25rpx;
					height: 50rpx;
					width: 50rpx;
					z-index: 1000;
				}
			}
			
		}
		
	}
</style>