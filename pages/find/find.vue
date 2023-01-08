<template>
	<view class="find_page">
		<view class="find_swiper">
			<uni-swiper-dot :info="info" :current="current" field="content" mode="dot" :dotsStyles="dotsStyles">
				<swiper class="swiper-box" @change="change" autoplay="true" circular="true">
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
				<view class="find_box_herf_contents" v-for="(item) in find_box_herf_contents" :key="item.text">
					<navigator url="#">
						<image :src="item.src" class="find_box_herf_contents_img"></image>
						<view style="font-weight: 600 !important; font-family:‘Courier New’, Courier, monospace;">
							{{item.text}}</view>
					</navigator>
				</view>
			</view>
			<view class="cultural_guided_tour">
				<view class="cultural_guided_tour_text">
					<text style="font-family:‘Courier New’, Courier, monospace;">文化导览</text>
					<text
						style="font-size: 12px; font-weight: 550 !important; font-family:‘Franklin Gothic Medium’, ‘Arial Narrow’, Arial, sans-serif;">全部
						＞</text>
				</view>
				<scroll-view class="cultural_guided_tour_img" scroll-x="true">
					<view class="cultural_guided_tour_img_view">
						<view class="cultural_guided_tour_img_li" v-for="item in cultural_guided_tour_img"
							:key="item.id">
							<image :src="item.src" style="height: 120px; width: 120px; border-radius: 10px;"></image>
							<text
								style="font-size: 13px; font-weight: 550 !important; display: block;  font-family:‘Franklin Gothic Medium’, ‘Arial Narrow’, Arial, sans-serif;">{{item.text}}</text>
						</view>
					</view>
				</scroll-view>

			</view>
			<view class="cultural_collage">
				<view class="cultural_collage_text">
					<text
						style="font-weight: 550 !important; font-family:‘Courier New’, Courier, monospace;">文化拼贴</text>
					<text
						style="font-size: 12px; font-weight: 550 !important; font-family:‘Franklin Gothic Medium’, ‘Arial Narrow’, Arial, sans-serif;">全部
						＞</text>
				</view>
				<image src="../../static/logo.png" style="height: 120px; width: 275px;border-radius: 10px;"></image>
			</view>
			<view class="cultural_imprint" style="margin-top: 30px;">
				<text style="font-weight: 550 !important; font-family:‘Courier New’, Courier, monospace;">身边的文化印记</text>
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
				find_box_herf_contents: [{
					text: "文化地图",
					src: "../../static/explore_imgs/文化地图.png",
				}, {
					text: "创意小店",
					src: "../../static/explore_imgs/创意小店.png",
				}, {
					text: "创意手作",
					src: "../../static/explore_imgs/创意手作.png",
				}, {
					text: "创意 IP",
					src: "../../static/explore_imgs/创意IP.png",
				}, {
					text: "创意待定",
					src: "../../static/explore_imgs/创意待定.png",
				}],
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
			position: absolute;
			left: 0;
			top: 0;
			z-index: -999;
			width: 100%;
			height: 170px;

			.swiper-box {}

			.find_swiper_text {
				position: absolute;
				bottom: 45px;
				left: 8px;
				color: #ffffff;
				font-family: ‘Courier New’, Courier, monospace;
				;
			}
		}

		.find_box {
			border-radius: 20px 20px 0 0;
			// position: absolute;
			width: 100%;
			margin-top: 150px;
			height: auto;
			background-color: #f6f2e6;
			box-sizing: border-box;
			padding-left: 16px;

			// padding-right: 15.3px;
			.find_box_herf {
				padding-top: 60px;
				margin-bottom: 30px;
				height: 50px;
				display: flex;
				// justify-content: center;

				// align-items: center;
				.find_box_herf_contents {
					font-size: 11px;
					width: 60px;
					// font-weight: 600;
					// padding-left: 5px;
					// padding-right: 14px;
					
					.find_box_herf_contents_img{
						height: 30px;
						width: 30px;
						margin-left: 8px;
					}
				}

			}

			.cultural_guided_tour {
				padding-right: 25px;

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
							padding-right: 10px;


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

				}
			}
		}
	}
</style>
