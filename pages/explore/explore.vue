<template>
	<view>
		<view class="explore_top"></view>
		<view class="explore_font">探索文化印记</view>
		<view class="explore_center">
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
		<uni-card 
		title="文化印记" 
		note="true"
		>
			<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86ce8082b9394eceb62890363bdabbe4~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?" alt="">
		</uni-card>
		<button open-type="contact" bindcontact="handleContact" session-from="sessionFrom">Test</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.explore_top {
		width: 100%;
		height: 200px;
		background-color: #c6b089;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -999;
	}
	.explore_font {
		color: #fff;
		font-size: 20px;
		position: absolute;
		left: 50vw;
		transform: translate(-50%);
		top: 25px;
		z-index: 1000;
	}
	.explore_center {
		margin-top: 80px;
		display: block;
		background-color: #f6f2e6;
		height: 1000px;
		border-radius: 30px 30px 0 0;
	}
	.explore_lines {
		margin-top: 30px;
		display: flex;
		font-size: 11px;
		margin-left: 20px;
		margin-right: 20px;
	}
	.common_imgs {
		width: 20px;
		height: 20px;
	}
	.find_box_herf_contents {
		margin-left: 5px;
		font-size: 11px;
		padding-right: 14px;
		align-items: center;
	}
	.control_imgs {
		width: 45px;
		height: 45px;
		margin-left: 10px;
		margin-top: 20px;
	}
	.find_box_herf {
		padding-left: 40rpx;
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
</style>
