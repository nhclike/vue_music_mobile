<template>
 <div class="recommend" ref="recommend">
   <scroll class="recommend-content" :data="discList" ref="scroll">
     <div>
       <div class="slider-wrapper" v-if="recommends.length">
         <slider ref="slider">
           <div v-for="item in recommends">
             <a :href="item.linkUrl">
               <img @load="imageLoad" class="needsclick" :src="item.picUrl" alt="">
             </a>
           </div>
         </slider>
       </div>
       <div class="recommend-list">
         <h1 class="list-title">热门歌单推荐</h1>
         <ul>
           <li v-for="item in discList" class="item" @click="toDisc(item)">
             <div class="icon">
               <img width="60" height="60"  v-lazy="item.imgurl">
             </div>
             <div class="text">
               <h2 class="name" v-html="item.creator.name"></h2>
               <p class="desc" v-html="item.dissname"></p>
             </div>
           </li>
         </ul>
       </div>
     </div>
      <div class="load-container" v-show="!discList.length">
        <loading></loading>
      </div>
   </scroll>
   <router-view></router-view>

 </div>
</template>

<script>

  import {getRecommend,getDiscList} from '@/api/recommend'
  import {ERR_OK} from '@/api/config'
  import Slider from '@/base/slider/slider.vue'
  import Scroll from '@/base/scroll/scroll.vue'
  import Loading from '@/base/loading/loading.vue'
  import {playlistMixin} from '@/common/js/mixin.js'
  import {mapMutations} from 'vuex'
  export default {
    mixins: [playlistMixin],

    data() {
      return {
        recommends: [],
        discList: [],
        imageLoaded:false
      }
    },
    created(){
      this._getRecommend();
      /*setTimeout(()=>{
        this._getDiscList();

      },1000)*/
      this._getDiscList();
    },
    activated() {
     /* setTimeout(() => {
        this.$refs.slider && this.$refs.slider.refresh()
      }, 20)*/
    },
    components:{
      Slider,
      Scroll,
      Loading
    },
    methods:{
      handlePlaylist(playList){
        const bottom= playList.length>0?'60px':'';
        this.$refs.recommend.style.bottom=bottom;
        this.$refs.scroll.refresh()
      },
      _getRecommend(){
        getRecommend().then((res)=>{
          if(res.code===ERR_OK){
            //console.log(res.data.slider);
            this.recommends=res.data.slider;
          }
        })
      },
      _getDiscList(){
        getDiscList().then((res)=>{
          if(res.code===ERR_OK){
           // console.log(res.data.list);
            this.discList=res.data.list;
          }
        })
      },
      imageLoad(){
        if(!this.imageLoaded){
          this.$refs.scroll.refresh();
          this.imageLoaded=true;
        }
      },
      toDisc(item){

        this.$router.push({
          path: '/recommend/disc'
        })
        this.setDisc(item)
      },
      ...mapMutations({
        setDisc:'SET_DISC'
      })
    }
  }
</script>

<style scoped lang="less">
  @import "./../../common/css/variable.less";

  .recommend{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content{
      height: 100%;
      overflow: hidden;
      .slider-wrapper{
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .recommend-list{
        .list-title{
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size:@font-size-medium;
          color:@color-theme;
        }
        ul{
          .item{
            display: flex;
            box-sizing: border-box;
            align-items: center;
            padding: 0 20px 20px 20px;
            .icon{
              flex: 0 0 60px;
              width: 60px;
              padding-right: 20px;
            }
            .text{
              display: flex;
              flex-direction: column;
              justify-content: center;
              flex: 1;
              line-height: 20px;
              overflow: hidden;
              font-size:@font-size-medium;
              .name{
                margin-bottom: 10px;
                color:@color-text
              }
              .desc{
                color:@color-text-d
              }
            }
          }
        }
      }
      .load-container{
        position: absolute;
        width: 100%;
        top:50%;
        transform: translateY(-50%);
      }
    }
  }




</style>
