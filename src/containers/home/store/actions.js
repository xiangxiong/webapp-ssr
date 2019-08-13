import axios from 'axios';
import {CHANGE_LIST} from './constants';
// import clientAxios from '../../../client/request';
// import serverAxios from '../../../server/request';

const changeList = (list)=>({
    type: CHANGE_LIST,
    list
});

export const getHomeList = () =>{
    return (dispatch,getState,axiosInstance)=>{
        return axiosInstance.get('/api/news.json')
        .then((res)=>{
            const list = res.data.data;
            dispatch(changeList(list))
        });
    }
}
    // http://47.95.113.63/ssr/api/news.json?secret=D37msjPeC3
    // 浏览器运行
    // http:localhost:3000/api/news.json
    // 服务器运行
    // 服务器根目录下/api/news.json
    // let url = '';
    // if(server){
    //     url = 'http://47.95.113.63/ssr/api/news.json?secret=D37msjPeC3';
    // }else{
    //     url = '/api/news.json?secret=D37msjPeC3';
    // }
    // let request = null;
    // if(server){
    //     request = serverAxios;
    // }else{
    //     request = clientAxios;
    // }
    // const request = server ? serverAxios : clientAxios;
  
        // const options = {
        //     method:'get',
        //     headers:{"Access-Control-Allow-Origin":"*"},
        //     url:url
        // };
        // const options = {
        //     method: 'POST',
        //     headers: { "Access-Control-Allow-Origin":"*" },
        //     // data: qs.stringify(data),
        //     url
        //   }
        // axios(options)
        // .then((response)=>{
        //     response.headers.
        // });
        
        //  const url = 'https://www.binance.co/exchange/public/product';
        //  const list =  [{
        //     "symbol": "ETHSGD",
        //     "quoteAssetName": "SGD",
        //     "tradedMoney": 357.0,
        //     "baseAssetUnit": "",
        //     "baseAssetName": "ETH",
        //     "baseAsset": "ETH",
        //     "tickSize": "0.0000001",
        //     "prevClose": 140.0,
        //     "activeBuy": 0.0,
        //     "high": "140.0000000",
        //     "lastAggTradeId": -1,
        //     "low": "140.0000000",
        //     "matchingUnitType": "STANDARD",
        //     "close": "140.0000000",
        //     "quoteAsset": "SGD",
        //     "productType": null,
        //     "active": true,
        //     "minTrade": 0.01000000,
        //     "activeSell": 2.55,
        //     "withdrawFee": "10",
        //     "volume": "2.5500000",
        //     "decimalPlaces": 8,
        //     "quoteAssetUnit": "",
        //     "open": "140.0000000",
        //     "status": "TRADING",
        //     "minQty": 1E-8
        // }, {
        //     "symbol": "BTCSGD",
        //     "quoteAssetName": "SGD",
        //     "tradedMoney": 180.6,
        //     "baseAssetUnit": "฿",
        //     "baseAssetName": "Bitcoin",
        //     "baseAsset": "BTC",
        //     "tickSize": "0.01",
        //     "prevClose": 53.7,
        //     "activeBuy": 0.0,
        //     "high": "53.70",
        //     "lastAggTradeId": -1,
        //     "low": "1.10",
        //     "matchingUnitType": "STANDARD",
        //     "close": "5.00",
        //     "quoteAsset": "SGD",
        //     "productType": null,
        //     "active": true,
        //     "minTrade": 0.00000100,
        //     "activeSell": 57.0,
        //     "withdrawFee": "10",
        //     "volume": "57.00",
        //     "decimalPlaces": 8,
        //     "quoteAssetUnit": "",
        //     "open": "53.70",
        //     "status": "TRADING",
        //     "minQty": 1E-8
        // }];
        // dispatch(changeList(list));
