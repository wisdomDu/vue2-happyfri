import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import ajax from '../config/ajax'


Vue.use(Vuex)

const state = {
	level: 'unit1', //活动周数
	itemNum: 1, // 第几题
	itemDetail: ['konw','Du'],
	answerid: [], //答案id
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})
