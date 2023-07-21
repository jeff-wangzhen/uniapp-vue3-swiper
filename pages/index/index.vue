<template>
	<view class="content">
		<curry-swiper :width="195" :space="112" :inverseScaling="400" :height="107" :perspective="14" :border="3"
			:count="10" ref="swiper">
			<curry-slide v-for="(slide, i) in sceneList" :index="i" :key="i">
				<template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
					<img :data-index="index"
						:class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"
						:src="slide.img" />
				</template>
			</curry-slide>
		</curry-swiper>
	</view>
</template>

<script>
	import currySwiper from '../../components/curry-swiper/curry-swiper.vue'
	import currySlide from '../../components/curry-swiper/curry-slide.vue'
	export default {
		components: {
			currySwiper,
			currySlide
		},
		data() {
			return {
				sceneList: [{
						img: 'https://2fz1.me/img/phaser.jpg'
					},
					{
						img: 'https://2fz1.me/img/css3.png'
					},
					{
						img: 'https://2fz1.me/img/nodemodules.jpg'
					},
					{
						img: 'https://2fz1.me/img/js.jpg'
					}
				],
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>