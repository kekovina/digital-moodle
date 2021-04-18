import { observable, action, decorate, autorun } from 'mobx';
import cookie from 'react-cookies';
import axios from 'axios'
import { Upload, message } from 'antd';

class Store{
    @observable activePage = 'map'

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
        axios.get(`http://80.78.207.245:3001/users/${this.login}`).then((res) => {
            this.userInfo = res.data
        })   
    }
    @action.bound
    sendPin(pin){
        axios.post('http://80.78.207.245:3001/users/login', {login:this.login,pin: pin}).then((res) => {
        if(res.data){
            this.setActivePage("main")
            this.getUser()
        }    
        })
    }
    @action.bound
    sendTg(tg){
        axios.post('http://80.78.207.245:3001/users/login', {login: tg}).then((res) => {
        if(res.data.auth == 'pending'){
            this.setLogin(tg.substr(1))
        } else if(res.data.auth){
            axios.get(`http://80.78.207.245:3001/users/${tg.substr(1)}`).then((res) => {
                this.userInfo = res.data
            })   
        }   
        })
        
    }

    
    
}

export default new Store();