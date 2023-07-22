"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    /**calc(100% - )
     * 图片url列表，内部结构为Object，示例{"imgUrl":"http://www.abc.com/a.jpg","imgDesc":"我是描述文字"}
     */
    list: {
      type: Array,
      default: []
    },
    /**
     * swiper高度--单位rpx
     */
    height: {
      type: Number,
      default: 690
    },
    /**
     * 显示图片个数，仅支持3或5，默认3
     */
    showNum: {
      type: Number,
      default: 3
    },
    /**
     * swiper宽度--单位rpx
     */
    width: {
      type: Number,
      default: void 0
    },
    /**
     * 是否自动播放
     */
    autoPlay: {
      type: Boolean,
      default: false
    },
    /**
     * 自动播放间隔毫秒
     */
    autoPlayInterval: {
      type: Number,
      default: 5e3
    },
    /**
     * 是否显示轮播指示点
     */
    showDot: {
      type: Boolean,
      default: false
    },
    /**
     * 图片描述文字动画类型：slideFromRight、slideFromBottom、scaleX、scaleY
     */
    descAniType: {
      type: String,
      default: "slideFromRight"
    },
    /**
     * 指示点未选中背景色，支持css颜色值及渐变
     */
    dotColor: {
      type: String,
      default: "linear-gradient(to bottom, #999999, #c0c0c0)"
    },
    /**
     * 指示点选中背景色，支持css颜色值及渐变
     */
    dotSelectedColor: {
      type: String,
      default: "linear-gradient(to bottom, #92ffc0, #002661)"
    }
  },
  data() {
    return {
      curr: 0,
      /**
       * 开始触摸点坐标
       */
      start: {
        x: 0,
        y: 0
      },
      /**
       * 每个item样式列表
       */
      styleList: [],
      timer: void 0
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
        y: 0
      };
      this.styleList = [];
      this.closeTimer();
      this.initSwiper();
    }
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
        this.timer = void 0;
      }
    },
    /**
     * 计算每个item样式
     * @param {Object} idx
     */
    addStyle(idx) {
      const len = this.list.length;
      if (idx > len / 2) {
        var left = len - idx;
        const display = idx > this.showNum ? "block" : "none";
        console.log("if", idx, display);
        return {
          transform: "scaleX(" + (0.8 - left / 10) + ") translate(-" + left * 19 + "%,0px)",
          zIndex: 9999 - left,
          opacity: 0.8 / left,
          display
        };
      } else {
        const display = idx > len - this.showNum ? "none" : "block";
        console.log("else", idx, display);
        return {
          transform: "scaleX(" + (0.8 - idx / 10) + ") translate(" + idx * 19 + "%,0px)",
          zIndex: 9999 - idx,
          opacity: 0.8 / (idx === 0 ? 0.8 : idx),
          display
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
        if (tx === 0) {
          this.openTimer();
          return;
        }
        if (tx < 0) {
          this.curr = touchIdx === len - 1 ? 0 : touchIdx + 1;
          this.toSlideLeft();
        } else if (tx > 0) {
          this.curr = touchIdx === 0 ? len - 1 : touchIdx - 1;
          this.toSlideRight();
        }
      } else {
        if (tx === 0) {
          return;
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
      this.$emit("change", this.curr);
    },
    // 向右滑动--手指向右滑动
    toSlideRight() {
      var newStyleList = JSON.parse(JSON.stringify(this.styleList));
      var first = [newStyleList.shift()];
      newStyleList = newStyleList.concat(first);
      this.styleList = newStyleList;
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.list && $props.list.length > 0
  }, $props.list && $props.list.length > 0 ? {
    b: common_vendor.f($props.list, (item, index, i0) => {
      return common_vendor.e({
        a: index,
        b: $options.isObj(item) ? item.imgUrl : item,
        c: $options.isObj(item) && item.imgDesc
      }, $options.isObj(item) && item.imgDesc ? {
        d: common_vendor.t(item.imgDesc),
        e: common_vendor.n($props.descAniType),
        f: common_vendor.n({
          curr: $data.curr == index
        })
      } : {}, {
        g: common_vendor.o(($event) => $options.itemClick(index), index),
        h: index,
        i: $data.styleList[index].transform,
        j: $data.styleList[index].zIndex,
        k: $data.styleList[index].opacity,
        l: $data.styleList[index].display
      });
    }),
    c: $props.height + "rpx",
    d: $props.width ? $props.width + "rpx" : "100%",
    e: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    f: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args))
  } : {}, {
    g: $props.showDot
  }, $props.showDot ? {
    h: 40 * $data.curr + "rpx",
    i: $props.dotSelectedColor,
    j: common_vendor.f($props.list.length, (dot, idx, i0) => {
      return {
        a: common_vendor.n({
          active: idx == $data.curr
        }),
        b: idx
      };
    }),
    k: $props.dotColor
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d732e54b"], ["__file", "D:/www/uniapp-vue3-swiper/components/kevy-swiper/kevy-swiper.vue"]]);
wx.createComponent(Component);
