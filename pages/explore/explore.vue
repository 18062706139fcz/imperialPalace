<template>
	<view>
		<view class="explore_top"></view>
		<view class="explore_font">探索文化印记</view>
		<view class="explore_center">
			<view class="explore_lines">
				<view class="find_box_herf_contents" v-for="(item) in find_box_herf_contents" :key="item.name">
						<image :src=item.img_src  mode="" class="control_imgs"></image>
						<view style="font-weight: 600 !important; font-family:‘Courier New’, Courier, monospace;margin-left: 10px;"> {{item.name}}</view>
				</view>
			</view>
		<uni-card 
		title="文化印记" 
		note="true"
		>
			<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86ce8082b9394eceb62890363bdabbe4~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?" alt="">
		</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				find_box_herf_contents: [
					{name: "文化地图", img_src: '../../static/explore_imgs/文化地图.png'}, 
					{name: "创意小店", img_src: '../../static/explore_imgs/创意小店.png'},
					{name: "创意手作", img_src: '../../static/explore_imgs/创意手作.png'},
					{name: "创意IP", img_src: '../../static/explore_imgs/创意IP.png'}, 
					{name: "创意待定", img_src: '../../static/explore_imgs/创意待定.png'}],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
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
</style>
