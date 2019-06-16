<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>

	import {mapState, mapActions} from 'vuex'

	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo,
    })
  },
		onLoad() {
			this.userLogin()
		},
		methods: {
			...mapActions('user', ['changeUserInfo']),
			navigateTo () {
				
			},
			userLogin () {
				this.api.userLogin({}).then(res => {
					console.log(res)
					this.changeUserInfo(res)
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: $uni-color-error;
	}
</style>
