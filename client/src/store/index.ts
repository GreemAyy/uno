import {createStore} from 'vuex'
import userModule from './modules/userModule'
import UIModule from './modules/UIModule'

export default createStore({
    modules:{userStore:userModule,UIStore:UIModule}
})