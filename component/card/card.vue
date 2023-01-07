<template>
	<view>
		<view class=""></view>
		<img src={img_src} alt="图片">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				test1: 'test',
				img_src: ''
			}
		},
		methods: {
			
		},
		props: ['test', 'img_src']
	}
</script>

<style>

</style>
