<template>
   <div>
      <div class="search-bar">
         <van-row>
         <van-col span="3">
            <img :src="locationIcon" alt="" width="80%" class="location-icon">
         </van-col>
         <van-col span="16">
            <input type="text" class="search-input"/>
         </van-col>
         <van-col span="5">
            <van-button size="mini">查找</van-button>
         </van-col>
      </van-row>
      </div>
      <!-- swipper area -->
      <div class="swiper-area">
         <van-swipe :autoplay="1000">
            <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
               <img v-lazy="banner.image" alt="" width="100%">
            </van-swipe-item>
         </van-swipe>
      </div>
      <!-- type bar -->
      <div class="type-bar">
         <div v-for="(cate,index) in category" :key="index">
            <img v-lazy="cate.image" width="90%"/>
            <span>{{cate.mallCategoryName}}</span>
         </div>
      </div>
      <!-- addBanner area -->
      <div>
         <img v-lazy="addBanner" width="100%"/>
      </div>
      <!-- Recommend goods area -->
      <div class="recommend-area">
         <div class="recommend-title">
            商品推荐
         </div>
         <div class="recommend-body">
            <swiper :options="swiperOption">
               <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                  <div class="recommend-item">
                     <img :src="item.image" width="80%"/>
                     <div>{{item.goodsName}}</div>
                     <!-- 使用竖线进行格式化 -->
                     <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice| moneyFilter}})</div>
                  </div>
               </swiper-slide>
            </swiper>
         </div>
      </div>
      <floor-compoment :floorDate="floor1" :floorTitle="floorName.floor1"></floor-compoment>
      <floor-compoment :floorDate="floor2" :floorTitle="floorName.floor2"></floor-compoment>
      <floor-compoment :floorDate="floor3" :floorTitle="floorName.floor3"></floor-compoment>
      <!--Hot Area-->
      <div class="hot-area">
         <div class="hot-title">热卖商品</div>
         <div class="hot-goods">
            <van-list>
               <van-row gutter="20">
                  <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                     <goods-info-component :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info-component>
                  </van-col>
               </van-row>
            </van-list>
         </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {toMoney} from '@/filter/moneyFilter.js'
import floorCompoment from '../component/floorCompoment'
import goodsInfoComponent from '../component/goodsInfoComponent'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import url from '@/serviceApI.config.js'
export default {
   data(){
      return{
         locationIcon:require('../../assets/images/location.png'),
         bannerPicArray:[
            // {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
            // {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
            // {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'},
         ],
         category:[],
         addBanner:'',
         recommendGoods:[],
         swiperOption:{
            slidesPerView:3
         },
         floor1:[],
         floor2:[],
         floor3:[],
         floorName:{},
         hotGoods:[],//热卖商品
      }
   },
   filters:{
      moneyFilter(money){
         return toMoney(money)
      }
   },
   components:{swiper,swiperSlide,floorCompoment,goodsInfoComponent},
   created(){
      axios({
         url:url.getShopingMailInfo,
         methods:'get',//使用的请求方式
      })
      .then(response =>{
         console.log(response)
         if(response.status == 200){
            this.category=response.data.data.category;
            this.addBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
            this.bannerPicArray = response.data.data.slides;
            this.recommendGoods = response.data.data.recommend;
            this.floor1 = response.data.data.floor1              //楼层1数据
            this.floor2 = response.data.data.floor2              //楼层1数据
            this.floor3 = response.data.data.floor3              //楼层1数据
            this.floorName = response.data.data.floorName
            this.hotGoods = response.data.data.hotGoods

         }
      })
      .catch(error=>{
         console.log(error)
      })
   },
}
</script>

<style scoped>
.search-bar{
   height:2.2rem;
   background-color: #e5017d;
   line-height: 2.2rem;
   overflow: hidden;
}
.search-input{
   width: 100%;
   height: 1.3rem;
   border-top: 0px;
   border-right: 0px;
   border-left: 0px;
   border-bottom: 1px solid #fff !important;
   background-color: #e5017d;
   color: #fff;
}
.location-icon{
   padding-top: .2rem;
   padding-left: .3rem;
}
.swiper-area{
   clear: both;
   max-height: 15rem;
   overflow: hidden;
}
.type-bar{
   background-color: #fff;
   margin: 0 .3rem .3rem .3rem;
   border-radius: .3rem;
   font-size: 14px;
   display: flex;
   flex-direction: row;
   flex-wrap: nowrap;
}
.type-bar div{
   padding: .3rem;
   font-size: 12px;
   text-align: center;
}
.recommend-area{
   background-color: #fff;
   margin-top: .3rem;
}
.recommend-title{
   /*1.下划线，2.字体 */
   border-bottom: 1px solid #eee;
   font-size: 14px;
   padding: .2rem;
   color: #e5017d;
}
.recommend-body{
   border-bottom: 1px solid #eee;
}
.recommend-item{
   width: 99%;
   border-right: 1px solid #eee;
   font-size: 12px;
   text-align: center;
}
.floor-anomaly{
   display: flex;
   flex-direction: row;
   background-color: #fff;
   border-bottom: 1px solid #ddd;
}
.floor-anomaly div{
   width: 10rem;
   box-sizing: border-box;
   -webkit-box-sizing: border-box;
}
.floor-one{
   border-right: 1px solid #ddd;
}
.floor-two{
   border-bottom: 1px solid #ddd;
}
.floor-rule{
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   background-color: #fff;
}
.floor-rule div{
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
   width: 10rem;
   border-bottom: 1px solid #ddd;
}
.floor-rule div:nth-child(odd){
   border-right: 1px solid #ddd;
}
.hot-area{
   text-align: center;
   font-size:14px;
   height: 1.8rem;
   line-height:1.8rem;
}
</style>

