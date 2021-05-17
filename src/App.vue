<template>
  <div id="app">
    <div class="app-player">
      <!-- 1.音乐盒顶部的开始 -->
      <div class="app-player-header">
        <my-music-header @getlist="handleGetMusicList"></my-music-header>
      </div>
      <!-- 2.音乐盒中间的开始 -->
      <div class="app-player-content">
        <my-music-content
          :song-list="songList"
          @geturl="handlegetSongUrl"
          @getmv="handlegetMVUrl"
          :is-audio-playing="isAudioPlaying"
        ></my-music-content>
      </div>
      <!-- 3.音乐盒底部的开始 -->
      <div class="app-player-footer">
        <my-music-footer :song-url="songUrl" @pause="handlePause" @play="handlePlay"></my-music-footer>
      </div>
    </div>
    <div :class="['app-mask-content',{hidden:hiddenVedio}]">
      <div class="app-player-close" @click.stop="handleCloseMV">X</div>
      <div class="app-player-vedio">
        <video ref="vedio" :src="mvURL" controls="controls" loop="loop" autoplay="autoplay"></video>
      </div>
      <div class="app-mask"></div>
    </div>
  </div>
</template>

<script>
import MyMusicHeader from "@/components/my-music-header";
import MyMusicContent from "@/components/my-music-content";
import MyMusicFooter from "@/components/my-music-footer";
export default {
  name: "App",
  data: function() {
    return {
      songList: [],
      songUrl: "", // 歌曲的url
      mvURL: "",
      hiddenVedio: true, //默认情况下不显示vedio
      isAudioPlaying: true
    };
  },
  components: {
    "my-music-header": MyMusicHeader,
    "my-music-content": MyMusicContent,
    "my-music-footer": MyMusicFooter
  },
  methods: {
    handleGetMusicList: function(songList) {
      this.songList = songList;
    },
    handlegetSongUrl: function(songUrl) {
      this.songUrl = songUrl;
      // console.log(songUrl);
    },
    handlegetMVUrl: function(mvURL) {
      this.mvURL = mvURL;
      // 显示 弹出框
      this.hiddenVedio = false;
    },
    handleCloseMV: function() {
      this.hiddenVedio = true;
      this.$refs.vedio.pause();
    },
    handlePause: function(isAudioPlaying) {
      this.isAudioPlaying = isAudioPlaying;
    },
    handlePlay: function(isAudioPlaying) {
      this.isAudioPlaying = isAudioPlaying;
    }
  }
};
</script>

<style>
* {
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}
#app {
  background-image: url("./assets/img/Bg.jpg");
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  --themeColor: rgb(202, 29, 29);
}
.app-player {
  width: 1000px;
  height: 600px;
  border-radius: 10px;
}
.app-player-header {
  height: 60px;
  width: 100%;
  background-color: var(--themeColor);
}

.app-player-content {
  height: 480px;
  width: 100%;
  display: flex;
  border-bottom: 1px dotted var(--themeColor);
  background-color: rgba(255, 255, 255, 0.5);
}
.app-mask-content {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
.hidden {
  display: none;
}
.app-player-close {
  position: fixed;
  color: black;
  top: 10px;
  right: 10px;
  z-index: 1000;
}
.app-player-footer {
  height: 60px;
  width: 100%;
  background-color: var(--themeColor);
}
.app-player-vedio {
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  height: 800px;
  width: 600px;
  position: fixed;
  z-index: 999;
}
.app-player-vedio video {
  height: 800px;
  width: 600px;
}
.app-mask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(218, 197, 140, 0.7);
}
</style>
