<template>
	<view class="find_page">
		<view @click="img_display"  v-if="index>0" class="mask_img" style="display: flex; justify-content: center; align-items: center;">
			<image :src="'https://www.rykerfeng.cn/travel2/image/find_img/poster'+index+'.jpg'" style="height: 800rpx; width: 400rpx;"></image>
		</view>
		<view class="find_swiper">
			<uni-swiper-dot :info="info" :current="current" @clickItem="clickItem" field="content" mode="dot"
				:dotsStyles="dotsStyles" style="height: 400rpx;">
				<swiper :current="current1" class="swiper-box" @change="change" autoplay="true" circular="true"
					style="height: 400rpx;">
					<swiper-item v-for="(item ,index) in info" :key="item.id" style="height: 400rpx;">
						<image @click="img_show(index)" :src="item.content" mode="scaleToFill" style="width: 750rpx; height: 400rpx;"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="find_box">
			<view class="find_box_herf">
				<view class="find_box_herf_contents" v-for="(item) in find_box_herf_contents" :key="item.text">
					<navigator :url="item.herf" hover-stop-propagation="false" hover-class="none">
						<image :src="item.src" class="find_box_herf_contents_img"></image>
						<view style="font-weight: 600 !important; font-family:‘Courier New’, Courier, monospace;">
							{{item.text}}
						</view>
					</navigator>
				</view>
			</view>
			<view class="cultural_guided_tour">
				<view class="cultural_guided_tour_text" style="padding-bottom: 20rpx;">
					<text style="font-family:‘Courier New’, Courier, monospace;">文化导览</text>
					<navigator url="/pages/find/cultural_guided_tour" hover-stop-propagation="false" hover-class="none" style="display: inline;"> 
						<text
							style="font-size: 24rpx; font-weight: 550 !important; font-family:‘Franklin Gothic Medium’, ‘Arial Narrow’, Arial, sans-serif;">全部 >
						</text>
					</navigator>
					
				</view>
				<scroll-view class="cultural_guided_tour_img" scroll-x="true">
					<view class="cultural_guided_tour_img_view">
						<view class="cultural_guided_tour_img_li" v-for="item in cultural_guided_tour_img"
							:key="item.id">
							<image :src="item.src" style="height: 280rpx; width: 280rpx; border-radius: 28rpx;">
							</image>
							<text
								style="font-size: 30rpx; font-weight: 550 !important; display: block;  font-family:‘Franklin Gothic Medium’, ‘Arial Narrow’, Arial, sans-serif;">{{item.text}}</text>
						</view>
					</view>
				</scroll-view>

			</view>
			<view class="cultural_collage" style="padding-bottom: 60rpx;">
				<view class="cultural_collage_text" style="padding-bottom: 20rpx;">
					<text
						style=" font-weight: 550 !important; font-family:‘Courier New’, Courier, monospace;">文化拼贴</text>
					<text
						style="font-size: 24rpx; font-weight: 550 !important; font-family:‘Franklin Gothic Medium’, ‘Arial Narrow’, Arial, sans-serif;">全部 ></text>
				</view>
				<navigator url="/pages/find/cultural_collage" hover-stop-propagation="false" hover-class="none">
					<image src="https://www.rykerfeng.cn/travel2/image/find_img/cultural_collage.png"
						style="height: 300rpx; width: 600rpx;border-radius: 24rpx; margin-left: 35rpx;"></image>
				</navigator>
				
			</view>
			<view class="cultural_imprint" style="margin-top: 66rpx;">
				<view style="padding-bottom: 20rpx;">
					<text
						style="font-weight: 550 !important; font-family:‘Courier New’, Courier, monospace;">身边的文化印记</text>

				</view>
				<view class="cultural_imprint_img" style="display: flex; padding-bottom: 100rpx; ">
					<image src="https://www.rykerfeng.cn/travel2/image/find_img/poster2.jpg"
						style="height: 324rpx; width: 280rpx;border-radius: 24rpx; padding-right: 90rpx;"></image>
					<image src="https://www.rykerfeng.cn/travel2/image/find_img/promotional_cards2.jpg" style="height: 260rpx; width: 260rpx;border-radius: 24rpx;">
					</image>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				info: [{
					content: 'https://www.rykerfeng.cn/travel2/image/find_img/poster11.jpg',
					id: 1,
				}, {
					content: 'https://www.rykerfeng.cn/travel2/image/find_img/poster12.jpg',
					id: 2,
				}, {
					content: 'https://www.rykerfeng.cn/travel2/image/find_img/poster13.jpg',
					id: 3,
				}, {
					content: 'https://www.rykerfeng.cn/travel2/image/find_img/poster14.jpg',
					id: 4,
				}, {
					content: 'https://www.rykerfeng.cn/travel2/image/find_img/poster15.jpg',
					id: 5,
				}, {
					content: 'https://www.rykerfeng.cn/travel2/image/find_img/poster16.jpg',
					id: 6,
				}],
				current: 0,
				dotsStyles: { //圆点的样式

					backgroundColor: 'transparent',
					border: '6rpx #ffffff solid',
					color: '#ffffff',
					selectedBackgroundColor: '#ffffff',
					selectedBorder: '6rpx #ffffff solid',
					bottom: 50
				},
				find_box_herf_contents: [{
					herf: "/pages/find/cultural_map",
					text: "文化地图",
					src: "https://www.rykerfeng.cn/travel2/image/explore_imgs/文化地图.png",
				}, {
					herf: "#",
					text: "创意小店",
					src: "https://www.rykerfeng.cn/travel2/image/explore_imgs/创意小店.png",
				}, {
					herf: "/pages/find/creativeHandicraft",
					text: "创意手作",
					src: "https://www.rykerfeng.cn/travel2/image/explore_imgs/创意手作.png",
				}, {
					herf: "/pages/find/creativity_IP",
					text: "创艺 IP",
					src: "https://www.rykerfeng.cn/travel2/image/explore_imgs/创意IP.png",
				}, {
					herf: "#",
					text: "创意待定",
					src: "https://www.rykerfeng.cn/travel2/image/explore_imgs/创意待定.png",
				}],
				cultural_guided_tour_img: [{
					src: "https://www.rykerfeng.cn/travel2/image/find_img/promotional_cards1.jpg",
					text: "宣传卡片",
					id: 1,
				}, {
					src: "https://www.rykerfeng.cn/travel2/image/find_img/promotional_cards2.jpg",
					text: "宣传卡片",
					id: 2,
				}, {
					src: "https://www.rykerfeng.cn/travel2/image/find_img/promotional_cards3.jpg",
					text: "宣传卡片",
					id: 3,
				},
				 {
					src: "https://www.rykerfeng.cn/travel2/image/find_img/promotional_cards4.jpg",
					text: "宣传卡片",
					id: 4,
				}, {
					src: "https://www.rykerfeng.cn/travel2/image/find_img/promotional_cards5.jpg",
					text: "宣传卡片",
					id: 5,
				}],
				current1: 0
			}

		},
		onLoad() {
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			clickItem(e) {
				this.current1 = e;
			},
			img_show(index){
				this.index=index+1;
				// console.log(this.index);
			},
			img_display(){
				this.index=0;
			}
		}
	}
</script>

<style scoped lang="scss">
	// @font-face {
	// 	font-family: zhonghei;
	// 	src: url('../../font/ZHONGHEI.TTF');
	// }
	.mask_img {
		background-color: rgba(0, 0, 0, 0.7);
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		height: 100%;
	}

	.find_page {
		height: auto;

		// background-color: #853e38;
		.find_swiper {
			height: auto;
			background-color: #853e38;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -999;
			width: 100%;
			height: 400rpx;

			.swiper-box {}

		}

		.find_box {
			border-radius: 30rpx 30rpx 0 0;
			// position: absolute;
			width: 100%;
			margin-top: 320rpx;
			height: auto;
			background-color: #f6f2e6;
			box-sizing: border-box;
			padding-left: 40rpx;

			// padding-right: 15.3px;
			.find_box_herf {
				padding-top: 80rpx;
				margin-bottom: 80rpx;
				height: 100rpx;
				display: flex;
				// justify-content: center;

				// align-items: center;
				.find_box_herf_contents {
					font-size: 24rpx;
					width: 160rpx;
					// font-weight: 600;
					// padding-left: 5px;
					// padding-right: 14px;

					.find_box_herf_contents_img {
						height: 80rpx;
						width: 80rpx;
						margin-left: 10rpx;
					}
				}

			}

			.cultural_guided_tour {
				padding-right: 60rpx;

				.cultural_guided_tour_text {
					display: flex;
					justify-content: space-between;

				}

				.cultural_guided_tour_img {

					white-space: nowrap;

					.cultural_guided_tour_img_view {
						display: flex;
						flex-wrap: nowrap;

						.cultural_guided_tour_img_li {
							padding-right: 25rpx;


						}
					}

				}
			}

			.cultural_collage {
				margin-top: 120rpx;
				padding-right: 51rpx;

				.cultural_collage_text {
					display: flex;
					justify-content: space-between;

				}
			}
		}
	}
</style>
