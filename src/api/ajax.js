/*
封装axios的ajax请求函数模块
  向外暴露一个ajax函数，返回的是一个promise
*/
import axios from 'axios'

export default function ajax(url,data={},type='GET') {
  return new Promise(function (resolve,reject) {
    //1.异步发送ajax请求
    let promise;  //初始化promise
    if (type === 'GET') {//GET请求
      //处理query请求参数
      let dataStr = ''; //定义初始化query
      Object.keys(data).forEach(key => {
        dataStr += `${key}=${data[key]}&`;
      })
      //处理最后的&符号
      if (dataStr !== '') {
        dataStr =  dataStr.substring(0,dataStr.length-1);
        //添加到url上
        url += "?" + dataStr;
      }
      promise = axios.get(url)
    } else {//POST请求
      promise = axios.post(url,data)
    }
    promise.then(response => {
      //2.如果成功执行成功回调resolve()   保存数据，修改为成功状态，返回一个新的promise
      resolve(response.data)
    }).catch(error => {
      //3.如果失败执行失败回调reject()    保存数据，修改为失败状态，返回一个新的promise
      reject(error)
    })
  })
}