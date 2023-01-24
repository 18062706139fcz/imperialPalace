<template>
	<view class="body">
		<uni-popup ref="popup" type="message">
			<uni-popup-message type="success" :message="'成功切换为' + showColor" :duration="2000"></uni-popup-message>
		</uni-popup>
	  <canvas class="canvans" disable-scroll="true" canvas-id="canvas" id="canvas">
		<movable-area class='img-box width-full' style="width:100%; height:60vh">
		    <!-- 贴图开始 -->
			<view v-for="(item, index) in chooseImages">
				<movable-view v-if="item.chosedImg"  :x="item.x" :y="item.y" direction="all"  :data-item="item.idx" >
				  <view class='sticker-box' >
				    <image class='sticker width-full' mode="widthFix" :src="item.url"></image>
				  </view>
				  <image class='cancel' @click='cancel(item, event)' src='../../static/cancel.png'></image>
				</movable-view>
			</view>
		    <!-- 贴图结束 -->
		  </movable-area>
	  </canvas>
	  <view class="btns">
	    <button type="primary" size="mini" @click="clearCanvans">清除</button>
	    <button type="primary" size="mini" @click="redo">画笔</button>
	    <button type="primary" size="mini" @click="undo">贴纸</button>
	  </view>
	  <view class="allColors">
		  <view :class="'color' + ' ' + item.className" 
		  v-for="(item, index) in Colors" 
		  :key="item.className"
		  @click="changeColor(item)"
		  >
		  </view>
	  </view>
	  <view class='bottom'>
	  <view class="sticker-lists-body">
	      <scroll-view class="recommend_scroll_x_box" scroll-x="true">
	        <view class="sticker-list" v-for="(item, index) in stickers" :data-url="item" @click='changeImg(item)'>
	          <image :src='item.url'></image>
	        </view>
	      </scroll-view>
	    </view>
	    <view class='tab'>
	      <button type="warn" @click='save'>保存</button>
	    </view>
	  </view>
	</view>
</template>

<script>
	import { stickers, chooseImages } from './imgs.js'
	export default {
		data() {
			return {
				dom: null,
				ctx: null,
				timer: null,
				position: {
					x: Number,
				    y: Number
				},
				canvansSize: {
				    x: Number,
				    y: Number
				},
				redoList: [], 
				undoList: [],
				Colors: [
					{
						className: 'color_1',
						color: '#eeeeee',
						fontColor: '白色'
					},
					{
						className: 'color_2',
						color: '#000',
						fontColor: '黑色'
					},
					{
						className: 'color_3',
						color: '#ff0000',
						fontColor: '红色'
					},
					{
						className: 'color_4',
						color: '#FAE81B',
						fontColor: '黄色'
					},
					{
						className: 'color_5',
						color: '#283CF0',
						fontColor: '绿色'
					},
					{
						className: 'color_6',
						color: '#F01AA6',
						fontColor: '粉色'
					},
					{
						className: 'color_1',
						color: '#eeeeee',
						fontColor: '白色'
					},
					{
						className: 'color_2',
						color: '#000',
						fontColor: '黑色'
					},
					{
						className: 'color_3',
						color: '#ff0000',
						fontColor: '红色'
					},
					{
						className: 'color_4',
						color: '#FAE81B',
						fontColor: '黄色'
					},
					{
						className: 'color_5',
						color: '#283CF0',
						fontColor: '绿色'
					},
					{
						className: 'color_6',
						color: '#F01AA6',
						fontColor: '粉色'
					},
					{
						className: 'color_1',
						color: '#eeeeee',
						fontColor: '白色'
					},
					{
						className: 'color_2',
						color: '#000',
						fontColor: '黑色'
					},
					{
						className: 'color_3',
						color: '#ff0000',
						fontColor: '红色'
					},
					{
						className: 'color_4',
						color: '#FAE81B',
						fontColor: '黄色'
					},
					{
						className: 'color_5',
						color: '#283CF0',
						fontColor: '绿色'
					},
					{
						className: 'color_6',
						color: '#F01AA6',
						fontColor: '粉色'
					},
				],
				chooseImages: [],
				showColor: '',
				stickers: [],
				x: 160,
				y: 50,
				chosedImg: false,
				stv: {
				    offsetX: 160,
				    offsetY: 50,
				    zoom: false, //是否缩放状态
				    distance: 0,  //两指距离
				    scale: 1,  //缩放倍数
				    width: 50,
				    height: 50,
				},
			}
		},
		methods: {
			savaCanvans() {
			    uni.canvasToTempFilePath({
			      x: 0,
			      y: 0,
			      canvasId: 'canvas',
			      success: (res) => {
			        this.redoList = [res.tempFilePath, ...this.redoList]
					console.log(res.tempFilePath)
			        this.undoList = []
			      }
			    })
			},
			onTouchStart(e) {
			    const event = e.touches[0];
			    this.position.x = event.x
				this.position.y = event.y
				console.log(e)
			},
			onTouchMove(e) {
				const event = e.touches[0];
				// 设置画笔颜色
				// 设置线条宽度
				this.ctx.setLineWidth(3);
				 // 让线条圆润
				this.ctx.setLineCap('round');
				// 开始绘画
				this.ctx.beginPath();
				this.ctx.moveTo(event.x, event.y);
				this.ctx.lineTo(this.position.x, this.position.y);
				this.position.x = event.x
				this.position.y = event.y
				this.ctx.stroke();
				this.ctx.draw(true);
				this.ctx.closePath();

			},
			clearCanvans() {
			    this.ctx.clearRect(0, 0, 1500, 1500);
			    this.ctx.draw(true);
			    const redoList = this.redoList.slice(1);
			    this.undoList = []
			  },
			  // 重做
			  redo() {
			    // this.ctx.drawImage(this.redoList[1], 0, 0, this.canvansSize.x, this.canvansSize.y);
			    // this.ctx.draw();
			    // this.undoList.unshift(this.redoList.shift());
			    // this.redoList = this.redoList
			    // this.undoList = this.undoList
				
			  },
			  // 撤销
			  undo() {
			    this.ctx.drawImage(this.undoList[0], 0, 0, this.canvansSize.x, this.canvansSize.y);
			    this.ctx.draw();
			    this.redoList.unshift(this.undoList.shift());
			    this.redoList = this.redoList,
			    this.undoList = this.undoList
			  },
			onTouchEnd() {
			    // 画笔结束时 对redoList池子里加一条记录 并且清空undoList池子
			    this.savaCanvans();
			},
			changeColor(item) {
				this.ctx.setStrokeStyle(item.color);
				this.showColor = item.fontColor
				this.$refs.popup.open()
			},
			changeImg (item) {
				const obj = {
					idx: true,
					x: 160,
					y: 50,
					stv: {
						offsetX: 160,
						offsetY: 50,
						zoom: false, //是否缩放状态
						distance: 0,  //两指距离
						scale: 1,  //缩放倍数
						width: 50,
						height: 50,
					},
					chosedImg: true,
					url: item.url
				}
				this.chooseImages.push(obj)
				// this.ctx.setStrokeStyle("");
			},
			cancel (item) {
			    item.chosedImg = false,
			    item.x = 150
			    item.y = 75
			    item.stv = {
			        offsetX: 75,
			        offsetY: 75,
			        zoom: false, //是否缩放状态
			        distance: 0,  //两指距离
			        scale: 1,  //缩放倍数
			        width: 50,
			        height: 50,
			      }
			  },
			  onTouchStart2() {
				  console.log('test')
			  },
			  onTouchMove2() {
				  console.log('test')
			  },
			  onTouchEnd2() {
				  console.log('test')
			  }
		},	
		onLoad() {
			let that = this;
			// 获取画板的宽高
			wx.createSelectorQuery().select('.canvans').boundingClientRect(res => {
			    this.canvansSize = {
			        x: res.width,
			        y: res.height
			    }
			}).exec();
			    // 初始化白板
			this.ctx = wx.createCanvasContext('canvas', this);
			this.ctx.setStrokeStyle("#ff0000");
			// 首先保存下空白的快照 作为重做的底子
			this.ctx.draw(false, function() {
			    that.savaCanvans();
			});
			this.stickers = stickers
			this.chooseImages = chooseImages
			this.dom = document.getElementById('canvas')
		},
	}
</script>

<style lang="scss">
.body {
  background-color: #eeeeee;
  width: 100vw;
  height: 100vh;
}
.canvans {
  width: 100vw;
  height: 60vh;
  background-color: white;
}
.btns {
  padding: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center
}
.allColors {
	height: 20vh;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	.color {
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		border: 1px black solid;
	}
	.color_1 {
		background-color: #eeeeee;
	}
	.color_2 {
		background-color: #000;
	}
	.color_3 {
		background-color: #ff0000;
	}
	.color_4 {
		background-color: #FAE81B;
	}
	.color_5 {
		background-color: #283CF0;
	}
	.color_6 {
		background-color: #F01AA6;
	}
	// .active {
	// 	border-color: #2EFA49;
	// }
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20vh;
  background-color: rgba(230,225,225,0.8);
}

.bottom>view.tab {
  padding-right: 30rpx;
  padding-left: 30rpx;
}

.bottom>view.sticker-lists-body{
  padding-left: 30rpx;
}

.recommend_scroll_x_box {
  height: 100rpx;
  padding-top: 30rpx;
  padding-bottom: 40rpx;
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  display: flex;
  vertical-align: top;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.sticker-lists-body {
  padding-left: 30rpx;
}

.sticker-lists-body .sticker-list {
  width: 100rpx;
  height: 100rpx;
  margin-right: 24rpx;
  display: inline-block;
  vertical-align: top;
}
.sticker-lists-body .sticker-list image {
  width: 100rpx;
  height: 100rpx;
  background-color: #ffffff;
}

.bottom image {
  width: 50rpx;
  height: 50rpx;
}

.bottom .tab image {
  margin-right: 60rpx;
}

.bottom .tab {
  padding: 25rpx 60rpx;
  background-color: #f4f4f4;
  height: 70rpx;
}

.bottom .tab .tab-list {
  position: relative;
  float: left;
  display: flex;
  align-items: center;
  margin-top: 10rpx;
}

.bottom .tab button{
  background-color: #d81e06;
  float: right;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 30rpx;
}

.bottom .tab button.color-red {
  background-color: #fff;
  border: 1rpx solid #d81e06;
  margin-right: 10rpx;
}

.bottom .tab .tab-list image.active::before {
  content: '';
  position: absolute;
  top: -50rpx;
  left: 5rpx;
  border-right: 20rpx solid transparent;
  border-left: 20rpx solid transparent;
  border-bottom: 20rpx solid #f4f4f4;
}





movable-view {
  height: 50px;
  width: 50px;
}

movable-view .sticker-box {
  position: relative;
  width:100%;
  height: 100%;
  border: 1rpx dashed #ccc;
}
.width-full {
	height: 50px;
	width: 30px;
}

image.cancel {
  position: absolute;
  top: -15rpx;
  left: -15rpx;
  width:30rpx;
  height: 30rpx;
  z-index: 30;
}

.canvas-box {
  opacity: 0;
  position: fixed;
  top: 100%; 
  left: 0;
  z-index: -1;
}  

.canvas-box canvas {
  opacity: 0;
} 


</style>
