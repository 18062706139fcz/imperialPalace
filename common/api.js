import Request from '@/utils/request.js'
let http = new Request().http

export default {
	// main.js
	getPicture() {
		return http({
			url: '/travel2/backend/cultureTutor/getCultureTutorList.php',

		})
	},
	getPicture2() {
		return http({
			url: '/travel2/backend/cultureLocation/getCultureLocationList.php',

		})
	},
	login(code) {
		return http({
			url: '/travel2/backend/user/login.php?code=' + code
		})
	},
	change_mysql(img, user_id, title, text, longitude, latitude, place_id, mark_menu) {
		return http({
			method: 'GET',
			url: '/travel2/backend/userMoments/addAMoment.php',
			data: {
				user_id: user_id,
				title: title,
				img: img,
				text: text,
				longitude: longitude,
				latitude: latitude,
				user_place: place_id,
				mark_menu: mark_menu,
			}
		})
	},
	get_uesr_works(code){
		return http({
			url: '/travel2/backend/user/getMyUserMoment.php?userid='+code,
		})
	}
}
