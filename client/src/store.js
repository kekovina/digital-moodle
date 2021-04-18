import { observable, action, decorate, autorun } from 'mobx';
import cookie from 'react-cookies';
import axios from 'axios'
import { Upload, message } from 'antd';
<<<<<<< HEAD




var store = {
    a:5
}









export default store;
=======
import { serverUrl } from './config'

class Store{
    @observable activePage = 'auth'

    @action.bound
    setActivePage(page){
        this.activePage = page
    } 
    @observable login = ''
    @action.bound
    setLogin(login){
        this.login = login
    }
    @observable userInfo = {}
    @action.bound 
    getUser(){
        axios.get(`${serverUrl}/users/${this.login}`).then((res) => {
            this.userInfo = res.data
        })   
    }
    @action.bound
    sendPin(pin){
        axios.post(`${serverUrl}/users/login`, {login:this.login,pin: pin}).then((res) => {
        if(res.data){
            this.setActivePage("main")
            this.getUser()
        }    
        })
    }
    @action.bound
    sendTg(tg){
        axios.post(`${serverUrl}/users/login`, {login: tg}).then((res) => {
        if(res.data.auth == 'pending'){
            this.setLogin(tg.substr(1))
        } else if(res.data.auth){
            axios.get(`${serverUrl}/users/${tg.substr(1)}`).then((res) => {
                this.setLogin(tg.substr(1))
                this.userInfo = res.data
                this.setActivePage('main')
            })   
        }   
        })
        
    }
    @observable users = []
    @action.bound getUsers(){
        axios.get(`${serverUrl}/users`).then(res => {
            if(res.data){
                this.users = res.data.users
            }
        })
    }
    @observable enemyInventory = []
    @action.bound setEnemyInventory(inv){
        this.enemyInventory = inv
    }
    
    
}

export default new Store();
>>>>>>> master
