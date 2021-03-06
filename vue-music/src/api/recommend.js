import jsonp from '@/common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'
//拿到推荐栏轮播数据
export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data=Object.assign({},commonParams,{
    platform:'h5',
    uni:0,
    needNewCode:1
  })
  return jsonp(url,data,options)
}
//拿到歌单列表数据
export function getDiscList() {
  //const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const url='/api/getDiscList';
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  });

  //return jsonp(url,data,options)
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return  Promise.resolve(res.data)
  })
}

//拿到每个歌单对应的歌曲
export function getSongList(disstid) {
  //const url='https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  const url='/api/getCdInfo';
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
