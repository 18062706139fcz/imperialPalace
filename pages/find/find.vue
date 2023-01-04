<template>
	<view class="find_page">
		<view class="find_swiper">
			<uni-swiper-dot :info="info" :current="current" field="content" mode="dot" :dotsStyles="dotsStyles">
				<swiper class="swiper-box" @change="change" autoplay="true">
					<swiper-item v-for="(item ,index) in info" :key="item.id">
						<view class="swiper-item">
							{{item.content}}
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
			<text class="find_swiper_text">社会活动实践海报</text>
		</view>
		<view class="find_box">
			<view class="find_box_herf">
				<view class="find_box_herf_contents" v-for="(item) in find_box_herf_contents" :key="item">
					<navigator url="#">
						<text> {{item}}</text>
					</navigator>

				</view>
			</view>
			<view class="cultural_guided_tour">
				<view class="cultural_guided_tour_text">
					<text>文化导览</text>
					<text>全部 ＞</text>
				</view>
				<scroll-view class="cultural_guided_tour_img" scroll-x="true">
					<view class="cultural_guided_tour_img_view">
						<view class="cultural_guided_tour_img_li" v-for="item in cultural_guided_tour_img"
							:key="item.id">
							<image :src="item.src" style="height: 120px; width: 120px; border-radius: 10px;"></image>
							<text style="display: block;">{{item.text}}</text>
						</view>
					</view>
				</scroll-view>

			</view>
			<view class="cultural_collage">
				<view class="cultural_collage_text">
					<text>文化拼贴</text>
					<text>全部 ＞</text>
				</view>
				<image src="../../static/logo.png" style="height: 120px; width: 275px;border-radius: 10px;"></image>
			</view>
			<view class="cultural_imprint" style="margin-top: 30px;">
				<text style="font-weight: 550; ">身边的文化印记</text>
				<view class="cultural_imprint_img" style="display: flex; padding-bottom: 50px;">
					<image src="../../static/logo.png"
						style="height: 150px; width: 135px;border-radius: 10px; padding-right: 15px;"></image>
					<image src="../../static/logo.png" style="height: 120px; width: 120px;border-radius: 10px;"></image>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: [{
					content: '内容 A',
					id: 1,
				}, {
					content: '内容 B',
					id: 2,
				}, {
					content: '内容 C',
					id: 3,
				}, {
					content: '内容 D',
					id: 4,
				}, {
					content: '内容 E',
					id: 5,
				}],
				current: 0,
				dotsStyles: { //圆点的样式

					backgroundColor: 'transparent',
					border: '2px #ffffff solid',
					color: '#ffffff',
					selectedBackgroundColor: '#ffffff',
					selectedBorder: '2px #ffffff solid',
					// bottom:25
				},
				find_box_herf_contents: ["文化地图", "创意小店", "创意手作", "创意IP", "创意待定"],
				cultural_guided_tour_img: [{
					src: "../../static/logo.png",
					text: "宣传卡片",
					id: 1,
				}, {
					src: "../../static/logo.png",
					text: "宣传卡片",
					id: 2,
				}, {
					src: "../../static/logo.png",
					text: "宣传卡片",
					id: 3,
				}]
			}

		},
		onLoad() {

		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style scoped lang="scss">
	// @font-face {
	// 	font-family: zhonghei;
	// 	src: url('../../font/ZHONGHEI.TTF');
	// }
	.find_page {
		height: auto;
		// background-color: #853e38;
		.find_swiper {
			height: auto;
			background-color: #853e38;
			position: relative;

			.swiper-box {

				// left: 0;
				// top: 0;

				.swiper-item {
					color: #ffffff;
				}
			}

			.find_swiper_text {
				position: absolute;
				bottom: 25px;
				left: 8px;
				color: #ffffff;
				// font-family: xiaosong;
			}
		}

		.find_box {
			// border-radius: 20px 20px 0 0;
			height: auto;
			background-color: #f6f2e6;
			box-sizing: border-box;
			padding-left: 16px;

			// padding-right: 15.3px;
			.find_box_herf {
				padding-top: 60px;

				height: 50px;
				display: flex;
				// justify-content: center;

				// align-items: center;
				.find_box_herf_contents {
					font-size: 11px;
					font-weight: 600;
					// padding-left: 5px;
					padding-right: 16px;
				}

			}

			.cultural_guided_tour {
				padding-right: 25px;

				.cultural_guided_tour_text {
					display: flex;
					justify-content: space-between;
					font-weight: 550;
				}

				.cultural_guided_tour_img {

					white-space: nowrap;

					.cultural_guided_tour_img_view {
						display: flex;
						flex-wrap: nowrap;

						.cultural_guided_tour_img_li {
							padding-right: 10px;
							font-weight: 550;

						}
					}

				}
			}

			.cultural_collage {
				margin-top: 50px;
				padding-right: 25px;

				.cultural_collage_text {
					display: flex;
					justify-content: space-between;
					font-weight: 550;
				}
			}
		}
	}
</style>
