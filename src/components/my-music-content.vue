<!-- 音乐盒中间 的内容 -->
<template>
  <div class="music-content">
    <!-- 中间左边部分 -->
    <div class="music-content-left">
      <div class="content-left-list">
        <div class="left-list-item" v-for="(item) in songList" :key="item.id">
          <div class="list-item-left" @click="getSong(item.id)"></div>
          <div class="list-item-mid">{{ item.name }}-{{ item.artists[0].name }}</div>
          <div
            :class="['list-item-right',{ hide: item.mvid === 0 ? true : false }]"
            @click="getMV(item.mvid)"
          ></div>
        </div>
      </div>
    </div>
    <!-- 中间中间部分 -->
    <div class="music-content-mid">
      <img src="/imgs/player_bar.png" alt :class="['play-bar',{ playing : audioPlaying }]" />
      <img
      v-for="(item) in songList" :key="item.id"
        :src="item.artists[0].img1v1Url"
        class="cover"
      />
      <img src="/imgs/disc.png" alt :class="['disc',{ autorotate : audioPlaying }]" />
    </div>
    <!-- 中间右边部分 -->

    <div class="music-content-right">
      <p>热门评论</p>
      <div class="comment-list">
        <div class="comment-list-item" v-for="(comment) in hotComments" :key="comment.commentId">
          <div class="list-item-left">
            <img :src="comment.user.avatarUrl" alt />
          </div>
          <!-- 和 老师 不同 list-item-right -->
          <div class="list-item-right">
            <div class="item-right-top">{{ comment.user.nickname }}</div>
            <div class="item-right-bottom">{{ comment.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: {
    songList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    isAudioPlaying: {
      type: Boolean,
      default: true
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // audioPlaying: this.isAudioPlaying
      audioPlaying: false,
      // 热门评论
      hotComments: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    isAudioPlaying: function(newValue) {
      this.audioPlaying = newValue;
    }
  },
  //方法集合
  methods: {
    getSong: async function(id) {
      // 第一个请求
      let res1 = await this.$http.get("song/url", {
        params: {
          id: id
        }
      });
      let songUrl = res1.data.data[0].url;
      this.$emit("geturl", songUrl);
      console.log(res1);
      // .then(res => {
      //   ;
      //   let songUrl = res.data.data[0].url;
      //
      // })

      // 第二个请求 ,获取评论
      let res2 = await this.$http.get("comment/hot", {
        params: {
          type: 0,
          id: id
        }
      });
      // console.log(res2);
      this.hotComments = res2.data.hotComments;
      // 歌曲正在播放
      this.audioPlaying = true;
    },
    getMV: async function(mvid) {
      let res = await this.$http.get("mv/url", {
        params: {
          id: mvid
        }
      });
      let mvURL = res.data.data.url;
      this.$emit("getmv", mvURL);
      console.log(res);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
@keyframes running {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.music-content {
  display: flex;
  .music-content-left {
    width: 250px;
    border-right: 1px dotted var(--themeColor);
    height: 480px;
    .content-left-list::-webkit-scrollbar {
      display: none;
    }
    .content-left-list {
      overflow-y: scroll;
      height: 480px;
      .left-list-item:nth-child(odd) {
        background-color: rgba(221, 161, 161, 0.747);
      }
      .left-list-item {
        display: flex;
        align-items: center;
        height: 50px;
        justify-content: space-between;
        .list-item-left {
          width: 25px;
          height: 25px;
          background: url(/imgs/table.png) -18px -18px;
        }

        .list-item-mid {
          overflow: hidden;
          // text-overflow: ellipsis;
          height: 20px;
          line-height: 20px;
          width: 130px;
          text-align: center;
        }
        .hide {
          visibility: hidden;
        }
        .list-item-right {
          width: 30px;
          height: 20px;
          background: url(/imgs/table.png) left -45px;
        }
      }
    }
  }

  .music-content-mid {
    width: 500px;
    border-right: 1px dotted var(--themeColor);
    height: 480px;
    position: relative;
    .cover {
      top: 156px;
      left: 156px;
      position: absolute;
      width: 150px;
      height: 150px;
    }
    .disc {
      position: absolute;
      left: 100px;
      top: 100px;
    }
    .play-bar {
      left: 200px;
      position: absolute;
      z-index: 8;
      transform: rotate(-25deg);
      transform-origin: 12px 12px;
      transition: all 2s;
    }
    .playing {
      transform: rotate(0) !important;
    }
    .autorotate {
      animation-name: running;
      animation-duration: 5s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  }

  .music-content-right {
    width: 250px;
    height: 480px;
    padding: 5px;
    p {
      font-weight: 500;
      font-size: 14px;
      text-align: center;
    }
    // 隐藏 滚动条
    .comment-list::-webkit-scrollbar {
      display: none;
    }
    .comment-list {
      height: 480px;
      overflow-y: scroll;
      .comment-list-item {
        display: flex;
        padding: 5px;
        .list-item-left {
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
        }

        .list-item-right {
          padding: 7px;
          .item-right-top {
            font-size: 15px;
          }

          .item-right-bottom {
            font-size: 12px;
            // font-weight: 100;
            color: black;
          }
        }
      }
    }
  }
}
</style>