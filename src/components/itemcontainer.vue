<template>
  	<section>
      <div class="select_word" v-show="showSelect">
        <div class="select_top" @click="hideSelect">
          <img style="position:fixed;right:0.5rem;top:0.5rem" src="../images/close.png" width="30" alt="">
        </div>
        <div class="select_data">
          <div class="eve_word" v-for="(value,index) in itemDetail" @click="selectCur(index)">
            {{index+1}}.    {{value}}
          </div>
        </div>
      </div>
    	<header class="top_tips" @click="showSelectContainer">
    		<span class="num_tip" v-if="fatherComponent == 'home'">{{level}}</span>
    		<span class="num_tip" v-if="fatherComponent == 'item'">{{itemNum}}</span>
    	</header>
    	<div v-if="fatherComponent == 'home'" >
    		<div class="home_logo item_container_style"></div>
    		<router-link to="item" class="start button_style" ></router-link>
    	</div>
    	<div v-if="fatherComponent == 'item'" >
    		<div class="item_back item_container_style">
    			<div class="item_list_container" v-if="itemDetail.length > 0">
    				<!-- <header class="item_title">{{itemDetail[itemNum-1].topic_name}}：</header> -->
    				<div class="word_container">
    				  <span class="wordName">{{itemDetail[itemNum-1]}}</span>
    				</div>
            <div class="translate_container" v-show="showTrans">
              <header class="trans_header">释义：</header>
              <div class="trans_result">
                {{transResult}}
              </div>
            </div>
    			</div>
    		</div>
    		<span class="next_item button_style1" @click="nextItem" v-if="itemNum <= itemDetail.length"></span>
        <span class="next_item1 button_style2" @click="notKnow" v-if="itemNum <= itemDetail.length"></span>
    		<!-- <span class="submit_item button_style" v-else @click="submitAnswer"></span> -->
    	</div>
  	</section>
</template>

<script>
import md5 from 'js-md5'
import { mapState, mapActions } from 'vuex'
export default {
	name: 'itemcontainer',
	data() {
		return {
			itemId: null, //题目ID
			choosedNum: null, //选中答案索引
			choosedId:null, //选中答案id
      showTrans:false,
      showSelect:false,
      transResult:null,
      item:[1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12,6,7,8,9,10,11,12]
    }
	},
  	props:['fatherComponent'],
  	computed: mapState([
	  	'itemNum', //第几题
  		'level', //第几周
  		'itemDetail', //题目详情
  		'timer', //计时器
	]),
  	methods: {
  		...mapActions([
  			'addNum', 'initializeData','setWord'
  		]),
  		//点击下一题
      notKnow(){
        let appid = '20170805000070851';
        let key = 'UhT9ITTfQE0Iks6r78Um';
        let salt = (new Date).getTime();
        let query = this.itemDetail[this.itemNum-1];
        let from = 'en';
        let to = 'zh';
        let str1 = appid + query + salt +key;
        let sign = md5(str1);
        this.$http.jsonp('http://api.fanyi.baidu.com/api/trans/vip/translate', {
          params: {
            q: query,
            appid: appid,
            salt: salt,
            from: from,
            to: to,
            sign: sign
          }
        })
        .then(function (response) {
            this.transResult = response.body.trans_result[0].dst
        })
        this.showTrans = true;
      },
      selectCur(index){
        this.setWord(index+1);
        this.showSelect = false
      },
      hideSelect(){
        this.showSelect = false;
      },
      showSelectContainer(){
        this.showSelect = true;
      },
  		nextItem(){
        if(this.itemNum>=this.itemDetail.length){
          this.$router.push('score')
        }
        else {
          this.showTrans = false;
        	this.addNum(this.choosedId)
        }
  		},
  		//索引0-3对应答案A-B
	  	//到达最后一题，交卷，请空定时器，跳转分数页面
	  	submitAnswer(){
	  			this.$router.push('score')
	  	},
	},
	created(){
		//初始化信息
		this.initializeData();
		document.body.style.backgroundImage = 'url(./static/img/1-1.jpg)';
	}
}
</script>

<style lang="less">
  .eve_word{
    padding-top: 0.5rem;
    color: #ffffff;
    font-size: 1.5rem;
    border: 0.05rem solid #bdbdbd
  }
  .select_data{
    position: relative;
    // top: 50px;
  }
  .select_top{
    position: fixed;
    height: 8%;
    top: 0;
    width: 100%;
    z-index: 100000;
    background-color: #58dea2
  }
  .select_word{
    top: 8%;
    position: absolute;
    width: 100%;
    height: 92%;
    z-index: 10000;
    overflow: scroll;
    background-color: rgba(1, 1, 1,0.9);
  }
  .trans_result{
    position:relative;
    color: #ffffff;
    font-size: 2rem;
    text-align: center;
    line-height: 6rem
  }
  .trans_header{
    left:0.5rem;
    top: 0.5rem;
    position:relative;
    color: #ffffff
  }
  .translate_container{
    top: 0.5rem;
    border: 0.05rem  solid #acacac ;
    position: relative;
    width: 100%;
    height: 10rem
  }
  .word_container{
    text-align: center;
    border: 0.05rem  solid #acacac ;
    width: 100%;
    position: relative;
    right: 0;
    height: 3rem;
    line-height: 2rem;
  }
  .wordName{
    top: 0.5rem;
    position: relative;
    font-size: 1.0rem;
    color: #ffffff;
  }
	.top_tips{
		position: absolute;
		height: 7.35rem;
		width: 3.25rem;
		top: -3rem;
		right: 1.6rem;
		background: url(../images/WechatIMG2.png) no-repeat;
		background-size: 100% 100%;
		z-index: 10;
		.num_tip{
			position: absolute;
			left: 0.48rem;
			bottom: 1.1rem;
			height: 0.7rem;
			width: 2.5rem;
			font-size: 0.6rem;
			font-family: '黑体';
			font-weight: 600;
			color: #a57c50;
			text-align: center;
		}
	}
	.item_container_style{
		height: 13rem;
		width: 100%;
		background-repeat: no-repeat;
		position: absolute;
		top: 3rem;
	}
	.home_logo{
		background-image: url(../images/1-2.png);
		background-size: 13.142rem 100%;
		background-position: right center;
	}
	.item_back{
		background-image: url(../images/2-1.png);
		background-size: 100% 100%;
	}
	.button_style{
        display: block;
        height: 2.1rem;
        width: 4.35rem;
        background-size: 100% 100%;
        position: absolute;
        bottom: 2rem;
        left: 50%;
        margin-left: -2.4rem;
        background-repeat: no-repeat;
	}
	.start{
        background-image: url(../images/1-4.png);
    }
    .next_item{
    	background-image: url(../images/1-5.png);
    }
    .submit_item{
    	background-image: url(../images/3-1.png);
    }
    .next_item1{
    	background-image: url(../images/1-6.png);
    }
    .button_style1{
          display: block;
          height: 2.1rem;
          width: 4.35rem;
          background-size: 100% 100%;
          position: absolute;
          bottom: 2rem;
          right: 10%;
          margin-left: -2.4rem;
          background-repeat: no-repeat;
  	}
    .button_style2{
          display: block;
          height: 2.1rem;
          width: 4.35rem;
          background-size: 100% 100%;
          position: absolute;
          bottom: 2rem;
          left: 10%;
          margin-right: -2.4rem;
          background-repeat: no-repeat;
  	}
    .item_list_container{
    	position: absolute;
    	height: 14.0rem;
    	width: 90%;
    	top: 2.4rem;
    	left: 5%;
		-webkit-font-smoothing: antialiased;
    }
	.item_title{
		font-size: 0.9rem;
		color: #fff;
		line-height: 0.7rem;
	}
</style>
