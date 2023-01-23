<template>
	<view class="mine_page">
		<view class="color_fill_c6b089">
			<view class="nickname_box">
				<view class="nickname_box_img">
					<image class="nickname_box_add" src="../../static/tabbar_img/useless5.png"></image>
				</view>
				<view class="nickname_box_content">
					<view
						style="padding-bottom: 10rpx;  font-family:‘Courier New’, Courier, monospace; letter-spacing: 2rpx; font-size: 35rpx;">
						昵称</view>
					<view style="padding-bottom: 5rpx;  font-size: 20rpx;">账号： 123456</view>
					<view style="padding-bottom: 5rpx;  font-size: 20rpx;">生日： 2020-10-10 &nbsp;&nbsp;&nbsp;性别：女</view>
					<view style="font-size: 20rpx;">IP属地：湖北武汉</view>
				</view>

			</view>
			<view style="height: 40rpx; padding-bottom: 10rpx;  font-size: 20rpx;">点击这里填写简介</view>
			<view class="user_information_box">
				<view class="user_information_li" v-for="item in user_information_li" :key="item.text">
					<view style="font-size: 20rpx; padding-left: 10rpx;">{{item.number}}</view>
					<view style="font-size: 20rpx;">{{item.text}}</view>
				</view>
				<view class="user_information_tags">
					<uni-badge text="1" is-dot="true" type="error" absolute="rightTop">
						<view class="user_information_tags1">消息通知</view>
					</uni-badge>

					<view class="user_information_tags1" style="margin-left: 10rpx;">消息通知</view>
					<view class="user_information_tags1" style="margin-left: 10rpx; width: 70rpx;">设置</view>
				</view>

			</view>
		</view>
		<view class="color_fill_f6f2e6">
			<view class="mine_text">
				<text style="font-family:‘Courier New’, Courier, monospace; padding-left: 200rpx;"
					@click="click_exhibition">发布</text>
				<text style="font-family:‘Courier New’, Courier, monospace; padding-left: 180rpx;"
					@click="click_cultural">搜藏</text>
			</view>
			<view class="mine_text_border">
				<view class="mine_text_border_view" style="margin-left: 200rpx;" v-show="current===1"></view>
				<view class="mine_text_border_view" style="margin-left: 450rpx;" v-show="current===2"></view>
			</view>
			<view class="mine_content">
				<view class="mine_exhibition" v-show="current===1">
					<view class="mine_exhibition_left" style="padding-top: 40rpx;">
						<view class="mine_exhibition_li" v-for="item in cultureTutor1" :key="item.id">
							<view class="img_view">
								<image :src="item.img_src"
									style="height: 150rpx; width: 300rpx; border-radius: 30rpx 30rpx 0 0;">
								</image>
								<view class="mine_exhibition_text1" >
									{{item.title}}
								</view>
								<view class="mine_exhibition_img2"></view>
							</view>
						</view>
					</view>
					<view class="mine_exhibition_right" style="padding-top: 20rpx;">
						<view class="mine_exhibition_li" v-for="item in cultureTutor1" :key="item.id">
							<view class="img_view">
								<image :src="item.img_src"
									style="height: 150rpx; width: 300rpx; border-radius: 30rpx 30rpx 0 0;">
								</image>
								<view class="mine_exhibition_text1" >
									{{item.title}}
								</view>
								<view class="mine_exhibition_img2"></view>
							</view>
						</view>
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
				user_information_li: [{
					number: 12,
					text: '关注'
				}, {
					number: 15,
					text: '粉丝'
				}, {
					number: 20,
					text: '获赞'
				}],
				cultureTutor1:[{
					img_src:'../../static/tabbar_img/find_on.png',
					title:"作品名称"
					
				},{
					img_src:'../../static/tabbar_img/find_on.png',
					title:"作品名称"
					
				}],
				cultureTutor2:[{
					img_src:'../../static/tabbar_img/find_on.png',
					title:"作品名称"
					
				},{
					img_src:'../../static/tabbar_img/find_on.png',
					title:"作品名称"
					
				}],
			}
		},
		methods: {
			click_exhibition() {
				this.current = 1;
			},
			click_cultural() {
				this.current = 2;
			},
		}
	}
</script>

<style scoped lang="scss">
	.mine_page {
		height: auto;
		background-color: #c6b089;
		font-family: ‘Courier New’, Courier, monospace;
		font-weight: 600 !important;

		.color_fill_c6b089 {
			padding-top: 30rpx;
			background-color: #c6b089;
			padding-left: 60rpx;

			.nickname_box {
				height: 170rpx;
				display: flex;

				.nickname_box_img {
					height: 150rpx;
					width: 150rpx;
					border-radius: 50%;
					background-color: #ffffff;
					position: relative;

					.nickname_box_add {
						position: absolute;
						height: 50rpx;
						width: 50rpx;
						right: 10rpx;
						bottom: 0;
						border-radius: 50%;
					}
				}

				.nickname_box_content {
					width: 540rpx;
					height: 150rpx;
					padding-left: 50rpx;

				}
			}

			.user_information_box {
				padding-top: 20rpx;
				height: 70rpx;
				display: flex;

				.user_information_li {
					padding-right: 40rpx;
				}

				.user_information_tags {
					padding-left: 80rpx;
					display: flex;
					align-items: center;
					height: 50rpx;

					.user_information_tags1 {
						height: 40rpx;
						width: 120rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 22rpx;
						border-radius: 30rpx;
						background-color: #f6f2e6;
					}
				}

			}
		}

		.color_fill_f6f2e6 {
			border-radius: 50rpx 50rpx 0 0;
			height: auto;
			background-color: #f6f2e6;

			.mine_text {
				display: flex;
				// justify-content: space-around;
				color: #000000;
				padding-top: 30rpx;
				padding-bottom: 5rpx;
				letter-spacing: 0.1rpx;
			}

			.mine_text_border {
				display: flex;
				// justify-content: space-around;
				height: 10rpx;

				.mine_text_border_view {
					height: 5rpx;
					border-radius: 3rpx;
					width: 60rpx;
					background-color: #a40000;
				}
			}
			.mine_content {
				padding-bottom: 200rpx;
				.mine_exhibition{
					display: flex;
					
					.mine_exhibition_li {
								
						margin-left: 75rpx;
						margin-bottom: 80rpx;
						margin-top: 25rpx;
								
						.img_view {
							background-color: #fffbef;
							height: 220rpx;
							width: 300rpx;
							position: relative;
							border-radius: 30rpx;
								
							.mine_exhibition_text1 {
								font-weight: 600 !important;
								font-family: ‘Courier New’, Courier, monospace;
								color: #000000;
								font-size: 24rpx;
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
							.mine_exhibition_img2{
								height: 30rpx;
								width: 30rpx;
								border-radius: 50%;
								background-color: #c6b089;
								margin-left: 20rpx;
							}
						}
								
					}
				}
				
			
			}
		}

	}
</style>
