import { observable, action, decorate } from 'mobx';
import cookie from 'react-cookies';
import axios from 'axios'
import { Upload, message } from 'antd';

class Store{
    @observable activePage = 'main'

    @action.bound
    setActivePage(page){
        this.activePage = page
    } 
}

export default new Store();