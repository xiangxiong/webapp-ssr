var ws;
var lockReconnect = false;
var wsUrl = 'wss://stream.binance.cloud:9443/ws/bnbbtc@depth20';

export function createWebSocket() {
    try {
        ws = new WebSocket(wsUrl);
        initEventHandle();
    } catch (e) {
        reconnect(wsUrl);
    }     
}

export function initEventHandle() {
    ws.onclose = function () {
        reconnect(wsUrl);
    };
    ws.onerror = function () {
        reconnect(wsUrl);
    };
    ws.onopen = function () {
        heartCheck.reset().start();
    };
    ws.onmessage = function (event) {
        heartCheck.reset().start();
    }
}

export function closeConnection(){
    ws.close();
}

function reconnect(url) {
    if(lockReconnect) return;
    lockReconnect = true;
    setTimeout(function () {
        createWebSocket(url);
        lockReconnect = false;
    }, 2000);
}


const heartCheck = {
    timeout: 60000,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function(){
        var self = this;
        this.timeoutObj = setTimeout(function(){
            ws.send("HeartBeat");
            self.serverTimeoutObj = setTimeout(function(){
                ws.close();
            }, self.timeout)
        }, this.timeout)
    }
}
