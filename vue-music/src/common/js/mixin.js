import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from '@/common/js/config.js';
import {shuffle} from '@/common/js/util.js'

//如果有播放列表就要显示playmini播放器主内容的bottom需要重新设置
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playList)
  },
  activated() {
    this.handlePlaylist(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
};

//根据播放模式设置播放按钮,点击切换播放模式

export const playerMixin={
  computed:{
    iconMode(){
      return this.mode===playMode.sequence?'icon-sequence':this.mode===playMode.loop?'icon-loop':'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'playList',
      'currentSong',
      'mode',
      'favoriteList'
    ])
  },
  methods:{
    changeMode(){
      const mode=(this.mode+1)%3;
      this.setPlayMode(mode);
      let List=null;
      if(mode===playMode.random){
        List=shuffle(this.sequenceList);

      }else{
        List=this.sequenceList;
      }
      this._resetCurrentIndex(List);

      this.setPlayList(List);
    },
    _resetCurrentIndex(list){
      let index=list.findIndex((item)=>{
        return item.id===this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    toggleFavorite(song){
      if(this.isFavorite(song)){
        this.deleteFavoriteList(song)
      }
      else{
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song){
      if(this.isFavorite(song)){
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite(song){
      const index=this.favoriteList.findIndex((item)=>{
        return item.id==song.id
      });
      return index>-1
    },
    ...mapMutations(        //不能直接修改vuex中的变量,通过映射方法传参数的方式提交改变vuex中的参数
      {
        setCurrentIndex:'SET_CURRENT_INDEX',
        setPlayMode:'SET_PLAY_MODE',
        setPlayList:'SET_PLAYLIST'
      }
    ),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }

};

//搜索逻辑
export const searchMixin={
  data(){
    return{
      queryStr:'',
      refreshDelay:100
    }
  },
  computed:{
    ...mapGetters([
      'searchHistory'
    ]),
  },
  methods:{
    onQueryChange(query){
      this.queryStr=query
    },
    addQuery(k){
      this.$refs.searchBox.setQuery(k);
    },
    saveSearch(item){
      this.saveSearchHistory(this.queryStr)
    },
    blurInput(){
      this.$refs.searchBox.blur()
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
};
