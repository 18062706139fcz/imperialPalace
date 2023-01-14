<template>
	<view class="main">
		<input class="title" type="text" placeholder="好的标题是点赞的开始~" v-model="title"/>
		<view style="width: 100%;height: 2rpx;background: #ead6ee;"></view>
		<textarea type="text" class="dynamic_text" placeholder="添加正文" v-model="text"></textarea>
		<view>
			<view class="topic">
				<view class="recommend_text1"><view>添加话题</view></view>
					<view class="topic_one_container">
						<text v-for="(item, index) in picker" :key="index" class="topic_one" @click.stop="click_topic" :style="{backgroundColor: (item==is_picker) ?'#fad396':''}" :data-text="item">
							#{{item}}
						</text>
					</view> 
				</view>
			</view>
			<view class="local">
				<view class="recommend_text2"><view>添加地点</view></view>
					<view class="local_one_container">
				      <text v-for="(item, index) in local_info" :key="index" class="local_one" @click.stop="click_site" :style="{backgroundColor:item.is_click?'#fad396':'#00000000'}" :data-text="item.text">#{{item.text}}</text> 
				    </view> 
			</view>
			<view class="imageContainer">
			    <image v-for="(item, index) in picture" :key="id" :src="item" @click.stop="preview_img" :id="item" v-for-index="index" @load="set_title_img_size" :data-index="index" class="nowImage"></image>
			  <image v-if="img_is_no_full" src="http://travel.rykerfeng.cn/wechatsoft/drawable/add_img.png" @click.stop="choose_img" class="add_img"></image>
			  </view>
			  <view class="reset_choose" @click="reset_choose_img">重新选择图片</view>
			  <loading :hidden="loadingHidden">正在上传...</loading>
			  <view class="finish">
			    <view @click="upload" class="go_button">发布帖子</view>
			    <view class="draft">
			      <image src="http://travel.rykerfeng.cn/wechatsoft/drawable/draft.png"></image>
			      <text>存草稿</text>
			    </view>
			  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//照片在本地显示的路径
				picture:[],
				//照片是否满9张了
				img_is_no_full:true,
				//是否隐藏加载中动画
				loadingHidden:true,
				//用户信息
				user_info:Object,
				//标题信息
				title:'',
				//文本信息
				text:'',
				title_img_size:'',
				//图片在服务器上的地址
				server_img_path:[],
				//是否上传成功
				is_upload_success:false,
				//景点信息
				place:Object,
				//滑动选择器的选项
				picker:['美食探店','特色产品','交通出行','民宿酒店','旅游景点'],
				//滑动选择器显示的内容
				default_picker:'美食探店',
				is_picker:'美食探店',
				local_info:Object,
				// hidden_diy_mark:true,
				diy_mark_text:'',
				mark: ''
			}
		},
		methods: {
			getMark() {
				this.$api.get_mark().then((res) => {
					if(res) {
						for(const i in res) {
							res[i].is_click = false
						}
						this.mark = res
					} else {
						console.log("获取标签信息错误")
					}
				})
			},
			set_title_img_size(e) {
				if(e.target.dataset.index == 0){
				      let title_img_size = String(e.detail.width)+','+String(e.detail.height);
				      this.title_img_size = title_img_size
				}
			},
			// 挑选颜色
			click_topic(e) {
				this.is_picker = e.target.dataset.text
			},
			click_site(e) {
				const local_info = this.local_info;
				for(const i in local_info){
				    if(local_info[i].text == e.target.dataset.text){
						local_info[i].is_click = !local_info[i].is_click;
				    }
				}
				this.local_info = local_info
			},
			choose_img() {
				const that = this
				uni.chooseImage({
					count: 9,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success(res) {
						if(res.tempFilePaths.length>=9) {
							that.img_is_no_full = false
						}
						const picture = that.picture
						for(const i in res.tempFilePaths) {
							picture.push(res.tempFilePaths[i])
						}
						that.picture = picture
					}
				})
			},
			preview_img(e) {
				uni.previewImage({
					urls: this.picture,
					current:e.currentTarget.id
				})
			},
			upload() {
				let url = this.picture;
				if(!this.judge_dynamic()) return;
				let i = 0
				let user_id = this.user_info.id
				let count = 0
				this.loadingHidden = false
				this.upload_sysc([],url,i,user_id,count);//开始上传，递归调用
			},
			judge_dynamic() {
			    let out = '';
			    if(!this.title){out = '没有输入标题\n'}
			    if(!this.text){out = '没有输入内容\n'}
			    if(!this.picture.length){out =  '没有选择图片'}
			   // if(this.data.is_picker == this.data.default_picker){out =  '没有选择标签'}
			    if(out){
			      uni.showToast({
			        icon:'error',
			        title: out,
			      })
			      return false;
			    }
			    return true;
			},
			upload_sysc(server_img_path,url,i,user_id,count) {
				const that = this
				let loacl_img_url = String(url[i]);
				uni.uploadFile({
					filePath: loacl_img_url,
					name: 'file',
					url: 'https://travel.rykerfeng.cn/upload_img.php',
					formData: {
						user_id: user_id
					},
					success(res) {
						server_img_path.push(res.data);
						if(res.data == 'upload fail') {
							uni.showToast({
								icon:'error',
								title: '上传错误，请稍后再试',
							})
							that.loadingHidden = true
							return;
						} else {
							console.log('upload_sync')
							if(url[i+1] != undefined) {
								that.upload_sysc(server_img_path,url,i+1,user_id,count+1) // 递归上传
							} else {
								count ++; // 在前面已经加总过了
								if(count === url.length) {
									console.log('upload_sync1')
									that.add_to_mysql(server_img_path.join(','),user_id,that.title,that.text);
								} else {
									console.log("upload fail")
								}
								that.loadingHidden = true
								return;
							}
						}
					},
					fail(err) {
						console.log(err, 'err')
						that.loadingHidden = true
					}
				})
			},
			add_to_mysql(server_img_path,user_id,title,text) {
				const that = this
				let local = this.get_local()
				let longitude= local.longitude;
				let latitude = local.latitude;
				let place_id = this.get_place_id(this.is_picker);
				let title_img_size = this.title_img_size;
				let mark_menu = this.is_picker;
				let local_info = this.local_info;
				let is_site_list = '';
				for(const i in local_info){
					if(local_info[i].is_click){
						is_site_list= is_site_list+String(local_info[i].text)+',';
					}
				}
				if(this.diy_mark_text){
					is_site_list = is_site_list + this.diy_mark_text + ',';
				}
				is_site_list = is_site_list.slice(0, is_site_list.length-1);
				console.log('upload_sync2')
				console.log(server_img_path, user_id, title, text, longitude, latitude, place_id, title_img_size, mark_menu, is_site_list)
				this.$api.change_mysql(server_img_path, user_id, title, text, longitude, latitude, place_id, title_img_size, mark_menu, is_site_list).then((res) => {
					// console.log(res)
					if(res != 'add fail') {
						that.is_upload_success = true
					}
					that.reset_data()
					// this.onReady()
					const dynamic_id = res
					uni.setStorageSync('go_dynamic_after_release', dynamic_id);
					uni.showToast({
						title: "发布成功",
						duration: 300
					}) 
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/main/main'
						})
					}, 300)
					// if()
				}, (err) => {
					console.log(err)
				})
			},
			get_local() {
				let local =  uni.getStorageSync('local');
				let longitude;
				let latitude;
				if(local){
					longitude = local.longitude,
				    latitude = local.latitude
				} 
				return{
				    longitude:longitude,
				    latitude:latitude
				}
			},
			get_place_id:function (is_picker) {
			    let i;
			    let place = this.place;
			    for(const i in place){
			      if(place[i].name == is_picker){
			        return place[i].id;
			      }
			    }
			    return 0;
			},
			reset_data() {
				uni.setStorageSync('release_flag', true)
				this.picture = []
				this.img_is_no_full = true
				this.loadingHidden = true
				this.user_info = {}
				this.title = ''
				this.text = ''
				this.title_img_size = ''
				this.server_img_path = ''
				this. is_upload_success = false
				this.place = {}
				this.picker = ['美食探店','特色产品','交通出行','民宿酒店','旅游景点']
				this.default_picker = '美食探店'
				this.is_picker = ''
				this.local_info = {}
				this.diy_mark_text = ''
			},
			reset_choose_img() {
				this.picture = []
			},
		},
		onReady() {
			// 要么有 要么为 空
			let user_info = uni.getStorageSync('user_info')?uni.getStorageSync('user_info'):null
			if(!user_info) {
				console.log("未获取user_info内容")
			}
			let local_info = uni.getStorageSync("local_info")
			for(const i in local_info) {
				local_info[i] = {
					text: local_info[i],
					is_click: false
				}
			}
			this.local_info = local_info
			this.user_info = user_info
			this.getMark()
		}
	}
</script>

<style>
/* pages/release/release/dynamic.wxss */
.main{
  width: 686rpx;
  padding-left: 32rpx;
  padding-right: 32rpx;
}
input{
  margin-bottom: 10rpx;
}
.title{
  margin-top: 20rpx;
  width: 100%;
  height:80rpx;
  font-size: 900;
  font-weight: 900;
}
.dynamic_text{
  padding-top: 20rpx;
  width: 100%;
  height: 300rpx;
  text-align: start;
}
.reset_choose{
  margin-top: 30rpx;
  width: 100%;
  text-align: center;
  line-height: 100%;
  color: #c4c4c4;
}
.reset_choose button{
  /* margin-right: 20rpx; */
  width:100%;
}
.picker{
  padding-left: 0rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}
.picker_text{
  padding-top: 6rpx;
  padding-bottom: 6rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  background-color:#956f31;
  border-radius: 10rpx;
}
.mark{
  width: 100%;
  margin-top: 30rpx;
  display: flex;
  flex-direction: column;  
}
.topic{
  margin-left: -30rpx;
  width: 745rpx; 
}
.topic_one_container{
  width: 100%;
  margin-top: 10rpx; 
  display: flex;
}
.topic_one{  
  display: flex; 
  align-items: center;
  font-size: 20rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-top: 6rpx;
  padding-bottom: 6rpx;
  margin-left: 12rpx;
  border: 1px solid #E5E5E5;
  box-sizing: border-box;
  border-radius: 36rpx;
} 
.local{ 
    margin-left: -30rpx;
    width: 745rpx;  
}
.local_one_container{ 
    width: 100%;
    margin-top: 10rpx; 
    display: flex; 
}
.local_one{ 
  display: flex; 
  align-items: center;
  font-size: 20rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-top: 6rpx;
  padding-bottom: 6rpx;
  margin-left: 12rpx;
  border: 1px solid #E5E5E5;
  box-sizing: border-box;
  border-radius: 36rpx;
} 
.mark_title{
  margin-left: 10rpx;
  padding: 10rpx 15rpx;
  width: 150rpx;
  background: #E5E5E5;
  border-radius: 8px;
  margin-bottom: 12rpx;
  text-align: center;
}
.mark view{
  display:flex;
  flex-direction:row;
  height:60rpx;
}
.mark_info{
  display: flex;
  flex-direction: row;
}
.recommend_text1 {  
  display: flex;  
  align-items: center;
  justify-content: center;
  height: 40rpx;
  width: 120rpx; 
  border-radius: 8rpx;
  background-color: #E5E5E5;
  margin-left: 15rpx;
  margin-right: 20rpx; 
  font-size: 20rpx; 
  /* identical to box height */   
}
.recommend_text2{  
  display: flex;  
  align-items: center;
  justify-content: center;
  height: 40rpx;
  width: 120rpx; 
  border-radius: 8rpx;
  background-color: #E5E5E5;
  margin-left: 15rpx;
  margin-right: 20rpx; 
  font-size: 20rpx; 
  margin-top: 20rpx;
  /* identical to box height */    
}
.mark_one{
  display: flex;
  align-items: center;
  font-size: 16rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-top: 6rpx;
  padding-bottom: 6rpx;
  margin-left: 20rpx;
  border: 1px solid #E5E5E5;
  box-sizing: border-box;
  border-radius: 36rpx;

}
.diy_mark_input{
  width: 40%;
  height: 100%;
  margin-left: 148rpx;
}
.imageContainer{
  margin-top: 10rpx;
  margin-left: -20rpx;
  width:720rpx
}
.nowImage{
  margin-top: 10rpx;
  margin-left: 10rpx;
  margin-right: 10rpx;
  width: 220rpx;
  border-radius: 30rpx;
  height: 220rpx;
  /* border: 2rpx solid #c4c4c4; */
}
.add_img{
  margin-top: 10rpx;
  margin-left: 10rpx;
  margin-right: 10rpx;
  width: 220rpx;
  border-radius: 30rpx;
  height: 220rpx; 
}
.finish{ 
  align-items: center;
  margin-top: 50rpx;
  display: flex;
  padding-bottom: 20rpx;
}
.go_button{
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 32rpx;
  color:white;
  width: 560rpx;
  height: 88rpx; 
  background: #956f31;
  border-radius: 44rpx;
}
.draft{
  margin-left: 50rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.draft text{
  font-size: 20rpx;
}
.draft image{ 
  width: 50rpx;
  height: 50rpx;
}
</style>
