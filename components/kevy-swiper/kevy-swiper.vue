<template>
   <view>
      <view
         v-if="list && list.length > 0"
         :style="{ height: height + 'rpx', width: width ? width + 'rpx' : '100%' }"
         class="swiper-container"
         @touchstart="touchStart"
         @touchend="touchEnd"
      >
         <view
            class="swiper-item"
            v-for="(item, index) in list"
            :key="index"
            :style="{
               transform: styleList[index].transform,
               'z-index': styleList[index].zIndex,
               opacity: styleList[index].opacity,
               display: styleList[index].display,
            }"
         >
            <view @click="itemClick(index)" class="wrap">
               <image :id="index" class="image" :src="isObj(item) ? item.imgUrl : item"></image>
               <view
                  v-if="isObj(item) && item.imgDesc"
                  :class="['image-desc', descAniType, { curr: curr == index }]"
                  >{{ item.imgDesc }}
               </view>
            </view>
         </view>
      </view>

      <view class="sw-con" v-if="showDot">
         <view class="t-dot-con">
            <view
               class="t-dot-active"
               :style="{ left: 40 * curr + 'rpx', background: dotSelectedColor }"
            ></view>
            <block v-for="(dot, idx) in list.length" :key="idx">
               <view class="t-dot-wrap">
                  <view
                     :class="['t-dot', { active: idx == curr }]"
                     :style="{ background: dotColor }"
                  ></view>
               </view>
            </block>
         </view>
      </view>
   </view>
</template>

<script>
export default {
   props: {
      /**calc(100% - )
       * 图片url列表，内部结构为Object，示例{"imgUrl":"http://www.abc.com/a.jpg","imgDesc":"我是描述文字"}
       */
      list: {
         type: Array,
         default: [],
      },
      /**
       * swiper高度--单位rpx
       */
      height: {
         type: Number,
         default: 690,
      },
      /**
       * 显示图片个数，仅支持3或5，默认3
       */
      showNum: {
         type: Number,
         default: 3,
      },
      /**
       * swiper宽度--单位rpx
       */
      width: {
         type: Number,
         default: undefined,
      },
      /**
       * 是否自动播放
       */
      autoPlay: {
         type: Boolean,
         default: false,
      },
      /**
       * 自动播放间隔毫秒
       */
      autoPlayInterval: {
         type: Number,
         default: 5000,
      },
      /**
       * 是否显示轮播指示点
       */
      showDot: {
         type: Boolean,
         default: false,
      },
      /**
       * 图片描述文字动画类型：slideFromRight、slideFromBottom、scaleX、scaleY
       */
      descAniType: {
         type: String,
         default: "slideFromRight",
      },
      /**
       * 指示点未选中背景色，支持css颜色值及渐变
       */
      dotColor: {
         type: String,
         default: "linear-gradient(to bottom, #999999, #c0c0c0)",
      },
      /**
       * 指示点选中背景色，支持css颜色值及渐变
       */
      dotSelectedColor: {
         type: String,
         default: "linear-gradient(to bottom, #92ffc0, #002661)",
      },
   },
   data() {
      return {
         curr: 0,
         /**
          * 开始触摸点坐标
          */
         start: {
            x: 0,
            y: 0,
         },
         /**
          * 每个item样式列表
          */
         styleList: [],
         timer: undefined,
      };
   },
   created() {
      this.isObj({});
      this.initSwiper();
   },
   watch: {
      list(newVal, oldVal) {
         console.log(333);
         this.curr = 0;
         this.start = {
            x: 0,
            y: 0,
         };
         this.styleList = [];
         this.closeTimer();
         this.initSwiper();
      },
   },
   methods: {
      //初始化swiper
      initSwiper() {
         if (this.list && this.list.length > 0) {
            this.list.forEach((item, index) => {
               this.styleList.push(this.addStyle(index));
            });
            this.openTimer();
         }
      },

      //开启自动定时器
      openTimer() {
         if (this.autoPlay === true && this.list.length > 1) {
            this.timer = setInterval(() => {
               this.curr = this.curr == this.list.length - 1 ? 0 : this.curr + 1;
               this.toSlideLeft();
            }, this.autoPlayInterval);
         }
      },
      //关闭自动定时器
      closeTimer() {
         if (this.autoPlay === true && this.list.length > 1) {
            clearInterval(this.timer);
            this.timer = undefined;
         }
      },
      /**
       * 计算每个item样式
       * @param {Object} idx
       */
      addStyle(idx) {
         // console.log(idx);
         const len = this.list.length;

         const leftShowNum = Math.floor(this.showNum / 2) - 1;

         const rightShowNum = this.showNum - leftShowNum;
         let transform = "";
         //let sn = 2//this.showNum == 5 && this.list.length >= 5 ? 2 : 1;
         if (idx > len / 2) {
            //这里是数组后一半的item放在左边,平移位置由远到近，例如共6个，后2个处理在这里
            var left = len - idx;
            const display = idx >= len - leftShowNum;
            console.log("if", idx, display);
            if (display) {
               transform = "scaleX(" + (0.8 - left / 10) + ") translate(-" + left * 19 + "%,0px)";
            } else {
               transform =
                  "scaleX(" + (0.8 - left / 10) + ") translate(-" + (left - 1) * 19 + "%,0px)";
            }
            return {
               transform,
               zIndex: 9999 - left,
            };
         } else {
            //这里是数组前一半item放在右边和正中间，平移位置由近到远，例如共6个，前4个处理在这里，这里第一个元素始终放在中间位置
            const display = idx < rightShowNum;
            console.log("else", idx, display);
            if (display) {
               transform = "scaleX(" + (0.8 - idx / 10) + ") translate(" + idx * 19 + "%,0px)";
            } else {
               transform =
                  "scaleX(" + (0.8 - idx / 10) + ") translate(" + (idx - 1) * 19 + "%,0px)";
            }

            return {
               transform,
               zIndex: 9999 - idx,
               //    opacity: 0.8 / (idx === 0 ? 0.8 : idx),
               //    display,
            };
         }
      },
      /**
       * 触摸开始
       * @param {Object} e
       */
      touchStart(e) {
         this.start.x = e.changedTouches[0] ? e.changedTouches[0].pageX : 0;
         this.start.y = e.changedTouches[0] ? e.changedTouches[0].pageY : 0;
         this.closeTimer();
      },
      /**
       * 触摸结束
       * @param {Object} e
       */
      touchEnd(e) {
         var len = this.styleList.length;
         var touchIdx = Number(e.target.id);
         let tx = e.changedTouches[0].pageX - this.start.x;
         let ty = e.changedTouches[0].pageY - this.start.y;
         if (Math.abs(tx) > Math.abs(ty)) {
            //左右方向滑动
            if (tx === 0) {
               //点击事件拦截
               this.openTimer();
               return;
            }
            if (tx < 0) {
               // 向左滑动--手指向左滑动
               this.curr = touchIdx === len - 1 ? 0 : touchIdx + 1;
               this.toSlideLeft();
            } else if (tx > 0) {
               // 向右滑动--手指向右滑动
               this.curr = touchIdx === 0 ? len - 1 : touchIdx - 1;
               this.toSlideRight();
            }
         } else {
            //这里就不处理上下方向的事件了，有此需求的同仁可以在这里写逻辑
            //上下方向滑动
            if (tx === 0) {
               //点击事件拦截
               return;
            }
            if (ty < 0) {
               // 向上滑动
            } else if (ty > 0) {
               // 向下滑动
            }
         }
         this.openTimer();
      },
      // 向左滑动--手指向左滑动
      toSlideLeft() {
         var newStyleList = JSON.parse(JSON.stringify(this.styleList));
         var last = [newStyleList.pop()];
         newStyleList = last.concat(newStyleList);
         this.styleList = newStyleList;
         //触发change事件
         this.$emit("change", this.curr);
      },
      // 向右滑动--手指向右滑动
      toSlideRight() {
         var newStyleList = JSON.parse(JSON.stringify(this.styleList));
         var first = [newStyleList.shift()];
         newStyleList = newStyleList.concat(first);
         this.styleList = newStyleList;
         //触发change事件
         this.$emit("change", this.curr);
      },
      /**
       * 当前item点击返回索引下标
       * @param {Object} idx
       */
      itemClick(idx) {
         this.$emit("click", idx);
      },
      //是否为对象
      isObj(o) {
         try {
            return typeof o === "object" && o !== null;
         } catch (e) {
            return false;
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.swiper-container {
   box-sizing: border-box;
   height: 690rpx;
   width: 100%;
   overflow: hidden;
   position: relative;
   text-align: center;

   .swiper-item {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.5s;

      //需要缩放动画的话注释下方放开这个
      .wrap {
         height: 100%;
         width: 90%;
         margin: 2rpx auto;
         position: relative;
         overflow: hidden;

         .image {
            height: 100px;
            width: 200px;
            border-radius: 10rpx;
            // box-shadow: 0 0 10rpx #333;//加阴影的话去掉注释即可
         }

         .image-desc {
            font-size: 30rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            height: 60rpx;
            padding: 0rpx 20rpx;
            background: rgba(0, 0, 0, 0.3);
            line-height: 60rpx;
            box-sizing: border-box;
            text-align: left;
            position: absolute;
            bottom: 0rpx;
            color: #ffffff;
            border-radius: 0rpx 0rpx 10rpx 10rpx;
            opacity: 0;
            transition: all 1s ease-out;

            //动画类型slideFromRight
            &.slideFromRight {
               transform: translateX(100%);

               &.curr {
                  opacity: 1;
                  transform: translateX(0);
               }
            }

            //动画类型slideFromBottom
            &.slideFromBottom {
               transform: translateY(100%);

               &.curr {
                  opacity: 1;
                  transform: translateY(0);
               }
            }

            //动画类型scaleX
            &.scaleX {
               transform: scaleX(0);

               &.curr {
                  opacity: 1;
                  transform: scaleX(1);
               }
            }

            //动画类型scaleX
            &.scaleY {
               transform: scaleY(0);

               &.curr {
                  opacity: 1;
                  transform: scaleY(1);
               }
            }
         }
      }
   }
}

.sw-con {
   width: 100%;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   position: relative;
   box-sizing: border-box;
   margin-top: 25rpx;

   .t-dot-con {
      display: inline-block;
      box-sizing: border-box;
      position: relative;
   }

   .t-dot-wrap {
      width: 40rpx;
      height: 20rpx;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      float: left;
   }

   .t-dot {
      width: 20rpx;
      height: 20rpx;
      // background: linear-gradient(to bottom, #666666, #999999);
      // background: -webkit-linear-gradient(to bottom, #666666, #999999);
      // opacity: 0.3;
      border-radius: 50%;
      transition: all 200ms ease-out;
      float: left;

      &.active {
         background: rgba(0, 0, 0, 0) !important;
      }
   }

   .t-dot-active {
      position: absolute;
      left: 0rpx;
      top: 0rpx;
      width: 40rpx;
      height: 20rpx;
      border-radius: 20rpx;
      transition: all 0.3s ease-in-out;
      z-index: 1;
      // background: linear-gradient(to bottom, #92ffc0, #002661);
      // background: -webkit-linear-gradient(to bottom, #92ffc0, #002661);
   }
}
</style>
