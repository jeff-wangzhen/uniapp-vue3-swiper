"use strict";
var common_vendor = require("../../common/vendor.js");
const currySlide = () => "../../components/liu-beautiful-slide/liu-beautiful-slide.js";
const _sfc_main = {
  components: {
    currySlide
  },
  data() {
    return {
      autoplay: true,
      interval: 1e3,
      bgUrl: "https://cdn.pixabay.com/photo/2020/09/05/19/38/landscape-5547401_1280.png",
      swiperList: [{
        picUrl: "https://cdn.pixabay.com/photo/2020/05/19/13/32/cartoon-5190837_1280.jpg",
        title: "\u601D\u8003"
      }, {
        picUrl: "https://cdn.pixabay.com/photo/2020/05/19/13/35/cartoon-5190860_1280.jpg",
        title: "\u96E8\u5929"
      }, {
        picUrl: "https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg",
        title: "\u5154\u5B50"
      }, {
        picUrl: "https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png",
        title: "\u65E5\u843D"
      }, {
        picUrl: "https://cdn.pixabay.com/photo/2022/11/29/19/05/boho-7625140_1280.jpg",
        title: "\u690D\u7269"
      }, {
        picUrl: "https://cdn.pixabay.com/photo/2022/08/25/23/06/woman-7411414_1280.png",
        title: "\u65F6\u5C1A"
      }, {
        picUrl: "https://cdn.pixabay.com/photo/2023/03/07/12/45/child-7835677_1280.jpg",
        title: "\u751F\u6D3B"
      }],
      sceneList: [
        {
          img: "https://2fz1.me/img/phaser.jpg"
        },
        {
          img: "https://2fz1.me/img/css3.png"
        },
        {
          img: "https://2fz1.me/img/nodemodules.jpg"
        },
        {
          img: "https://2fz1.me/img/js.jpg"
        }
      ],
      title: "Hello"
    };
  },
  onLoad() {
  },
  methods: {
    change(e) {
      console.log("\u5F53\u524D\u8F6E\u64AD\u4FE1\u606F\uFF1A", e);
    },
    click(e) {
      console.log("\u70B9\u51FB\u8F6E\u64AD", e);
    }
  }
};
if (!Array) {
  const _easycom_liu_beautiful_slide2 = common_vendor.resolveComponent("liu-beautiful-slide");
  _easycom_liu_beautiful_slide2();
}
const _easycom_liu_beautiful_slide = () => "../../components/liu-beautiful-slide/liu-beautiful-slide.js";
if (!Math) {
  _easycom_liu_beautiful_slide();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.change),
    b: common_vendor.o($options.click),
    c: common_vendor.p({
      swiperList: $data.swiperList,
      bgUrl: $data.bgUrl,
      autoplay: $data.autoplay,
      interval: $data.interval
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/www/uniapp-vue3-swiper/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
