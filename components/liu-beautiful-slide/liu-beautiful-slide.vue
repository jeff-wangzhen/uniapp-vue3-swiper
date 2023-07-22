<template>
    <view>
        <view class="card-list" v-if="showListArr.length>0">
            <image v-if="bgUrl" class="swiper-img" :src='bgUrl'></image>
            <p class="card-info" :class="item.class<7?'card' + item.class:'cardDefaut'"
                v-for="(item, index) in showListArr" :key="index" @click.stop="click(item.class,item,true)">

                <image class="item-img" :src="item.picUrl"></image>
                <view class="item-name">{{item.title}}</view>
            </p>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            //轮播数据源
            swiperList: {
                type: Array,
                default: [],
            },
            //背景图片
            bgUrl: {
                type: String,
                default: ''
            },
            //是否自动轮播
            autoplay: {
                type: Boolean,
                default: true
            },
            //轮播自动切换时间间隔
            interval: {
                type: Number,
                default: 5000
            },
            //点击轮播是否有触感振动(自动轮播不生效)
            vibrate: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                timer: null,
                showListArr: []
            };
        },
        watch: {
            swiperList: {
                deep: true,
                immediate: true,
                handler(newArr) {
                    let newList = JSON.parse(JSON.stringify(newArr))
                    if (newList.length == 0) return
                    this.$nextTick(() => {
                        newList.forEach((res, index) => {
                            res.class = index
                        })
                        this.showListArr = JSON.parse(JSON.stringify(newList))
                        console.log(454, this.showListArr)
                        if (this.autoplay) this.autoPlayFun()
                    })
                },
            }
        },
        methods: {
            autoPlayFun() {
                this.timer = setInterval(() => {
                    this.getMenu()
                }, this.interval)
            },
            getMenu() {
                let list = this.showListArr.filter(res => res.class == 1)
                this.click(1, list[0], false)
            },
            click(index, mess, clickState) {
                if (clickState) this.$emit('click', mess)
                if (this.autoplay && clickState) return
                if (clickState && this.vibrate && !this.autoplay) uni.vibrateShort()
                if (clickState) {
                    this.getMenu()
                    return
                }
                for (let i = 0; i < this.showListArr.length; i++) {
                    const item = this.showListArr[i]
                    if (item.class > index) {
                        item.class--
                    } else if (item.class === index) {
                        item.class = 0
                    } else if (item.class === 0) {
                        item.class = this.showListArr.length - 1
                    }
                }
                this.$emit('change', mess)
            },
        },
        destroyed() {
            clearInterval(this.timer)
        }
    };
</script>

<style scoped>
    .card-list {
        width: 100%;
        height: 300rpx;
        position: relative;
    }

    .swiper-img {
        position: absolute;
        width: 678rpx;
        height: 218rpx;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 16rpx;
        opacity: 0.7;
    }

    .card-list p {
        overflow: hidden;
        border-radius: 8rpx;
        position: absolute;
        z-index: 99;
        transition: all 2s cubic-bezier(0.36, 0, 2, 1);
    }

    .card-info {
        width: 230rpx;
        height: 260rpx;
        overflow: hidden;
        border-radius: 8rpx;
        box-shadow: 0px 2rpx 0rpx #f0f0f0;
    }

    .item-img {
        width: 100%;
        height: 100%;
    }

    .item-name {
        width: 40rpx;
        height: 100%;
        position: absolute;
        font-size: 28rpx;
        line-height: 28rpx;
        color: #FFFFFF;
        text-shadow: 0px 4rpx 8rpx #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .card0 {
        width: 230rpx;
        height: 260rpx;
        left: 260rpx;
        bottom: 15rpx;
        z-index: 99999 !important;
    }

    .card0 .item-name {
        width: 100%;
        top: 0rpx;
        font-size: 36rpx;
    }

    .card1 {
        width: 200rpx;
        height: 230rpx;
        z-index: 9999 !important;
        left: 205rpx;
        bottom: 30rpx;
    }

    .card1 .item-name {
        top: 0rpx;
        left: 12rpx;
    }

    .card2 {
        width: 200rpx;
        height: 230rpx;
        z-index: 9999 !important;
        right: 205rpx;
        bottom: 30rpx;
    }

    .card2 .item-name {
        top: 0rpx;
        right: 12rpx;
    }

    .card3 {
        width: 170rpx;
        height: 200rpx;
        z-index: 999 !important;
        left: 145rpx;
        bottom: 45rpx;
    }

    .card3 .item-name {
        top: 0rpx;
        left: 12rpx;
    }

    .card4 {
        width: 170rpx;
        height: 200rpx;
        z-index: 999 !important;
        right: 145rpx;
        bottom: 45rpx;
    }

    .card4 .item-name {
        top: 0rpx;
        right: 12rpx;
    }

    .card5 {
        width: 140rpx;
        height: 170rpx;
        z-index: 99 !important;
        left: 90rpx;
        bottom: 60rpx;
    }

    .card5 .item-name {
        top: 0rpx;
        left: 12rpx;
    }

    .card6 {
        width: 140rpx;
        height: 170rpx;
        z-index: 99 !important;
        right: 90rpx;
        bottom: 60rpx;
    }

    .card6 .item-name {
        top: 0rpx;
        right: 12rpx;
    }

    .cardDefaut {
        display: none;
    }
</style>
