<template>
	<view class="cultural_guided_page">
		<view class="cultural_guided_text">
			<text style="font-family:‘Courier New’, Courier, monospace;" @click="click_exhibition">展览预告</text>
			<text style="font-family:‘Courier New’, Courier, monospace;" @click="click_cultural">文化宣传</text>
		</view>
		<view class="cultural_guided_text_border">
			<view class="cultural_guided_text_border_view" style="margin-left: 135rpx;" v-show="current===1"></view>
			<view class="cultural_guided_text_border_view" style="margin-left: 510rpx;" v-show="current===2"></view>
		</view>
		<view class="cultural_guided_content">
			<view class="cultural_guided_exhibition" v-show="current===1">
				<view class="cultural_guided_exhibition_li" v-for="item in cultureTutor1" :key="item.id">
					<view class="img_view">
						<image :src="item.img_src"
							style="height: 300rpx; width: 600rpx; border-radius: 30rpx 30rpx 0 0;">
						</image>
						<view class="cultural_guided_exhibition_text1" >
							{{item.title}}
						</view>
						<text style="display: block; text-align：justify; color:#dadada; font-size: 25rpx; padding-left: 20rpx;padding-right: 20rpx;">{{item.description}}</text>
					</view>
				</view>
			</view>
			<view class="cultural_guided_exhibition" v-show="current===2">
				<view class="cultural_guided_exhibition_li" v-for="item in cultureTutor2" :key="item.id">
					<view class="img_view">
						<image :src="item.img_src"
							style="height: 300rpx; width: 600rpx; border-radius: 30rpx 30rpx 0 0;">
						</image>
						<view class="cultural_guided_exhibition_text1" >
							{{item.title}}
						</view>
						
						<view style="color:#dadada; font-size: 25rpx; padding-left: 20rpx;padding-right: 20rpx;">{{item.description}}</view>
						<view style="color:#dadada; font-size: 25rpx; padding-left: 20rpx;padding-right: 20rpx;">{{item.phone}}</view>
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 1,
				cultureTutor1: [],
				cultureTutor2: [],
			}
		},
		onLoad() {
			this.getPicture();
			this.getPicture2();
		},
		methods: {
			click_exhibition() {
				this.current = 1;
			},
			click_cultural() {
				this.current = 2;
			},
			getPicture: function() {
				this.$api.getPicture().then(res => {
					// console.log(res);
					if (res.code == 0) {
						this.cultureTutor1 = res.data;
					}
				}, err => {
					console.log(err);
				})
			},
			getPicture2: function() {
				this.$api.getPicture2().then(res => {
					// console.log(res);
					if (res.code == 0) {
						this.cultureTutor2 = res.data;
					}
				}, err => {
					console.log(err);
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.cultural_guided_page {
		background-color: #345950;
		height: auto;

		.cultural_guided_text {
			display: flex;
			justify-content: space-around;
			color: #ffffff;
			padding-top: 30rpx;
			padding-bottom: 5rpx;
			letter-spacing: 0.1rpx;
		}

		.cultural_guided_text_border {
			display: flex;
			// justify-content: space-around;
			height: 10rpx;

			.cultural_guided_text_border_view {
				height: 5rpx;
				border-radius: 3rpx;
				width: 100rpx;
				background-color: #fff;
			}
		}

		.cultural_guided_content {
			padding-bottom: 200rpx;
		
			.cultural_guided_exhibition_li {
		
				margin-left: 75rpx;
				margin-bottom: 100rpx;
				margin-top: 25rpx;
		
				.img_view {
					background-color: #517970;
					height: 500rpx;
					width: 600rpx;
					position: relative;
					border-radius: 30rpx;
		
					.cultural_guided_exhibition_text1 {
						font-weight: 600 !important;
						font-family: ‘Courier New’, Courier, monospace;
						color: white;
						font-size: 30rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						word-break: break-all;
						margin-bottom: 10rpx;
						padding-left: 20rpx;
						padding-right: 20rpx;
					}
				}
		
			}
		
		}
	}
</style>
