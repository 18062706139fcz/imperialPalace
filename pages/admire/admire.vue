<template>
	<view>
		<view class="explore_top"></view>
		<view class="explore_font">观赏</view>
		<view class="explore_center">
			<view class="explore_lines">
				<view class="find_box_herf_contents" v-for="(item) in find_box_herf_contents" :key="item.name">
						<image :src=item.img_src  mode="" class="control_imgs"></image>
						<view style="font-weight: 600 !important; font-family:‘Courier New’, Courier, monospace;margin-left: 10px;"> {{item.name}}</view>
				</view>
			</view>
		<uni-card
			title="标题文字"
			mode="style"
			:is-shadow="true"
			thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
			extra="Dcloud 2019-05-20 12:32:19"
			note="Tips"
		>
				uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可编译到iOS、Android、H5、以及各种小程序等多个平台。即使不跨端，uni-app同时也是更好的小程序开发框架。
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
