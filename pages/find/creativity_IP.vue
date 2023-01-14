<template>
	<view class="creativity_IP_page"> 
		<view class="creativity_img_li" v-for="(item,index) in creativity_img_li" :key="item.text1">
			<view class="img_view">
				<image :src="item.img" style="height: 140px; width: 280px;">
				</image>
				<image @click="change_like(index)" class="creativity_img_like" :src="item.heart_like?'../../static/explore_imgs/heart_red.png':'../../static/explore_imgs/heart.png'" ></image>
				
			</view>
			
			<view style="font-weight: 600 !important; font-family:‘Courier New’, Courier, monospace; color: white; font-size: 14px;">{{item.text1}}</view>
			<view style="color:#dadada; font-size: 10px;">{{item.text2}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				creativity_img_li:[{
					img:"../../static/explore_imgs/red_magnolia.png",
					text1:"木兰红色版本（名字）",
					text2:"其他说明",
					heart_like:0
				},{
					img:"../../static/explore_imgs/blue_magnolia.png",
					text1:"木兰蓝色版本（名字）",
					text2:"其他说明",
					heart_like:0
				},{
					img:"../../static/explore_imgs/chickpeas.png",
					text1:"赤小豆 蕲春",
					text2:"其他说明",
					heart_like:0
				},{
					img:"../../static/explore_imgs/bohang.png",
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

<style lang="scss">
	.creativity_IP_page{
		background-color: #3A5D55;
		height: auto;
		
		.creativity_img_li{
			padding-left: 20px;
			padding-bottom: 10px;
			padding-top: 10px;
			.img_view{
				height: 140px; 
				width: 280px;
				position: relative;
				.creativity_img_like{
					position: absolute;
					right: 10px;
					bottom: 10px;
					height: 20px;
					width: 20px;
					z-index: 1000;
				}
			}
			
		}
		
	}
</style>