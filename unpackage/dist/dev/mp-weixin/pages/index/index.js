"use strict";
const common_vendor = require("../../common/vendor.js");
const kevySwiper = () => "../../components/kevy-swiper/kevy-swiper.js";
const _sfc_main = {
  components: {
    kevySwiper
  },
  data() {
    return {
      //图片url列表，内部结构为Object或String，示例{"imgUrl":"http://www.abc.com/a.jpg","imgDesc":"我是描述文字"}或"http://www.abc.com/a.jpg"
      list: []
    };
  },
  onLoad() {
    let list = [
      {
        imgUrl: "https://www.changan.com.cn/uploads/chan_newsthumb/330513479a6459781f00398815b9906a.jpg",
        imgDesc: "我是第一个图片的说明文字"
      },
      {
        imgUrl: "https://www.changan.com.cn/uploads/chan_newsthumb/e1b488d041b576ba6ce1cc20a6cb81a3.jpg",
        imgDesc: "我是第二个图片的说明文字"
      },
      {
        imgUrl: "https://www.changan.com.cn/uploads/chan_newsthumb/40e7cb2bf37e1123b5e4547b094192c3.jpg",
        imgDesc: "我是第三个图片的说明文字"
      },
      {
        imgUrl: "https://www.changan.com.cn/uploads/chan_newsthumb/f60d441c589563b0ece918853194f6e9.jpg",
        imgDesc: "我是第四个图片的说明文字"
      },
      {
        imgUrl: "https://www.changan.com.cn/uploads/chan_newsthumb/cd4353d0d1322c6f085b1bb0ecf2c835.jpg",
        imgDesc: "我是第五个图片的说明文字"
      }
      // {
      //     imgUrl: 'https://www.changan.com.cn/cars_m/UNI-V/images/meitu/1.jpg',
      //     imgDesc: '我是第六个图片的说明文字'
      // }
    ];
    this.list = list;
  },
  methods: {
    //当点击图片时返回图片下标，用于跳转之类业务
    swClick(idx) {
      console.log("当前点击的图片下标为：" + idx);
    },
    //当切换后返回当前下标
    swChange(idx) {
      console.log("当前中间图片的下标为：" + idx);
    }
  }
};
if (!Array) {
  const _easycom_kevy_swiper2 = common_vendor.resolveComponent("kevy-swiper");
  _easycom_kevy_swiper2();
}
const _easycom_kevy_swiper = () => "../../components/kevy-swiper/kevy-swiper.js";
if (!Math) {
  _easycom_kevy_swiper();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.list && $data.list.length > 0
  }, $data.list && $data.list.length > 0 ? {
    b: common_vendor.o($options.swClick),
    c: common_vendor.o($options.swChange),
    d: common_vendor.p({
      autoPlay: false,
      autoPlayInterval: 5e3,
      list: $data.list,
      height: 500,
      showNum: 4,
      showDot: true,
      descAniType: "slideFromRight",
      dotColor: "linear-gradient(to bottom, #999999, #c0c0c0)",
      dotSelectedColor: "linear-gradient(to bottom, #92ffc0, #002661)"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/www/uniapp-vue3-swiper/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
