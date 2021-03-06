<template>
	<transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop="">
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll class="list-content" :refreshDelay="refreshDelay" :data="sequenceList" ref="listContent">
          <transition-group name="list" tag="ul" >
            <li :key="item.id" ref="listItem" class="item" v-for="(item,index) in sequenceList" @click.stop="selectItem(item,index)">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i class="icon" :class="getFavoriteIcon(item)" ></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="icon-add" ></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close"  @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表"  confirmBtnText="清空"></confirm>
      <add-song ref="addSong"></add-song>
    </div>
	</transition>
</template>

<script>
  import {playMode} from '@/common/js/config'
  import Scroll from '@/base/scroll/scroll'
  import Confirm from '@/base/confirm/confirm'
  import AddSong from '@/components/add-song/add-song'
  import {mapMutations,mapActions} from 'vuex'
  import {playerMixin} from '@/common/js/mixin.js'

  export default {
    mixins:[playerMixin],
    data(){
      return {
        showFlag:false,
        refreshDelay:100
      }
    },
    computed:{

      modeText() {
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
      }
    },
    components:{
      Scroll,
      Confirm,
      AddSong
    },
    methods:{
      show(){
        this.showFlag=true;
        setTimeout(()=>{
          this.$refs.listContent.refresh();
          this.scrollToCurrentItem(this.currentSong);
        },20)
      },
      hide(){
        this.showFlag=false;
      },
      getCurrentIcon(item){
        if(item.id===this.currentSong.id){
          return 'icon-play'
        }
        return ''
      },
      selectItem(item,index){
        if(this.mode===playMode.random){  //如果当前是随机播放
          index=this.playList.findIndex((song)=>{
            song.id===item.id
          })
        }
        this.setCurrentIndex(index);
        this.setPlayingState(true);
      },
      scrollToCurrentItem(current){
        const index=this.sequenceList.findIndex((item)=>{
          return item.id===current.id
        });
        this.$refs.listContent.scrollToElement(this.$refs.listItem[index],300);
      },
      deleteOne(item){
        this.deleteSong(item);
        //删除playlist导致整个player组件display为none，
        //此时showFlag为true,再次进入时player为可见，可是showFlag还是为true；
        //解决办法当playlist为[]时将playlist组件也隐藏掉，保证状态的一致性
        if(!this.playList.length){
          this.hide();
        }
      },
      showConfirm(){
        this.$refs.confirm.show()
      },
      confirmClear(){
        this.deleteSongList();
        this.hide();
      },
      addSong(){
        this.$refs.addSong.show()
      },
      ...mapMutations({
        setPlayingState:'SET_PLAYING_STATE'
      }),
      ...mapActions(
        [
          'deleteSongList',
          'deleteSong'
        ]
      )
    },
    watch:{
      currentSong(newSong,oldSong){
        if(!this.showFlag || (newSong.id==oldSong.id)){
          return
        }
        this.scrollToCurrentItem(newSong);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "./../../common/css/variable.less";
.playlist{
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background:@color-background-d;
  .list-wrapper{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: @color-highlight-background;
    .list-header{
      position: relative;
      padding: 20px 30px 10px 20px;
      .title{
        display: flex;
        align-items: center;
        .icon{
          margin-right: 10px;
          font-size: 30px;
          color:@color-theme-d;
        }
        .text{
          flex: 1;
          font-size: @font-size-medium;
          color:@color-text-l;
        }
        .clear{
          .icon-clear{
            font-size: @font-size-medium;
            color:@color-text-d;
          }
        }
      }
    }
    .list-content{
      max-height: 240px;
      overflow: hidden;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        &.list-enter-active,&.list-leave-active{
          transition: all 0.1s;
        }
        &.list-enter,&.list-leave-to{
          height: 0;
        }
        .current{
          flex: 0 0 20px;
          width: 20px;
          font-size: @font-size-small;
          color:@color-text-d;
        }
        .text{
          flex: 1;
          font-size: @font-size-medium;
          color:@color-text-d;
        }
        .like{
          font-size: @font-size-small;
          color:@color-theme;
          margin-right:15px ;
          .icon-favorite{
            color:@color-sub-theme
          }
        }
        .delete{
          font-size: @font-size-small;
          color:@color-theme;
        }
      }
    }
    .list-operate{
      width: 140px;
      margin: 20px auto 30px auto;
      .add{
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid @color-text-l;
        border-radius:100px;
        color:@color-text-l;
        .icon-add{
          margin-right: 5px;
          font-size: @font-size-small-s;
        }
        .text{
          font-size: @font-size-small;
        }
      }
    }
    .list-close{
      text-align: center;
      line-height: 50px;
      background: @color-background;
      font-size: @font-size-medium-x;
      color:@color-text-l;
    }
  }
}

  .list-fade-enter-active,.list-fade-leave-active{
    transition: all 0.5s;
    .list-wrapper{
      transition: all 0.5s;

    }
  }
  .list-fade-enter,.list-fade-leave-to{
    opacity: 0;
    .list-wrapper{
      transform: translate3d(0,100%,0);
    }
  }
</style>
