"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    swiperList: {
      type: Array,
      default: []
    },
    bgUrl: {
      type: String,
      default: ""
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5e3
    },
    vibrate: {
      type: Boolean,
      default: true
    }
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
        let newList = JSON.parse(JSON.stringify(newArr));
        if (newList.length == 0)
          return;
        this.$nextTick(() => {
          newList.forEach((res, index) => {
            res.class = index;
          });
          this.showListArr = JSON.parse(JSON.stringify(newList));
          console.log(454, this.showListArr);
          if (this.autoplay)
            this.autoPlayFun();
        });
      }
    }
  },
  methods: {
    autoPlayFun() {
      this.timer = setInterval(() => {
        this.getMenu();
      }, this.interval);
    },
    getMenu() {
      let list = this.showListArr.filter((res) => res.class == 1);
      this.click(1, list[0], false);
    },
    click(index, mess, clickState) {
      if (clickState)
        this.$emit("click", mess);
      if (this.autoplay && clickState)
        return;
      if (clickState && this.vibrate && !this.autoplay)
        common_vendor.index.vibrateShort();
      if (clickState) {
        this.getMenu();
        return;
      }
      for (let i = 0; i < this.showListArr.length; i++) {
        const item = this.showListArr[i];
        if (item.class > index) {
          item.class--;
        } else if (item.class === index) {
          item.class = 0;
        } else if (item.class === 0) {
          item.class = this.showListArr.length - 1;
        }
      }
      this.$emit("change", mess);
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showListArr.length > 0
  }, $data.showListArr.length > 0 ? common_vendor.e({
    b: $props.bgUrl
  }, $props.bgUrl ? {
    c: $props.bgUrl
  } : {}, {
    d: common_vendor.f($data.showListArr, (item, index, i0) => {
      return {
        a: item.picUrl,
        b: common_vendor.t(item.title),
        c: common_vendor.n(item.class < 7 ? "card" + item.class : "cardDefaut"),
        d: index,
        e: common_vendor.o(($event) => $options.click(item.class, item, true), index)
      };
    })
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3d862a06"], ["__file", "D:/www/uniapp-vue3-swiper/components/liu-beautiful-slide/liu-beautiful-slide.vue"]]);
wx.createComponent(Component);
