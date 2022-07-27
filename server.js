// const http = require("http") 
// const fs = require('fs')

// const hostname = "127.0.0.1" 
// const port = 3000 


// const server = http.createServer((req, res) => {
  
//     res.statusCode = 200 
//     res.writeHead(200,{"Content-Type":"text/html"}); // 웹페이지 출력
//     fs.createReadStream("./index.html").pipe(res);

// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })


//----------------------------------------------------------------------------------------

// ********* app.js 파일

// 디렉터리 관리를 위해 path 모듈 사용
// const path = require("path");


// HTTP 서버(express) 생성 및 구동

// 1. express 객체 생성
const express = require('express');
const app = express();

// 2. "/" 경로 라우팅 처리
// app.use("/", (req, res)=>{
//     res.sendFile(path.join(__dirname, './index.html')); // index.html 파일 응답
// })

// 3. 30001 port에서 서버 구동
const HTTPServer = app.listen(30001, ()=>{
    console.log("Server is open at port:30001");
});


// WebSocekt 서버(ws) 생성 및 구동

// 1. ws 모듈 취득
const wsModule = require('ws');

// 2. WebSocket 서버 생성/구동
const webSocketServer = new wsModule.Server( 
    {
        server: HTTPServer, // WebSocket서버에 연결할 HTTP서버를 지정한다.
        //port: 30002 // WebSocket연결에 사용할 port를 지정한다(생략시, http서버와 동일한 port 공유 사용)
    }
);


// connection(클라이언트 연결) 이벤트 처리
webSocketServer.on('connection', (ws, request)=>{

    // 1) 연결 클라이언트 IP 취득
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    
    console.log(`새로운 클라이언트[${ip}] 접속`);
    
    // 2) 클라이언트에게 메시지 전송
    if(ws.readyState === ws.OPEN){ // 연결 여부 체크
        ws.send(`클라이언트[${ip}] 접속을 환영합니다 from 서버`); // 데이터 전송
    }
    
    // 3) 클라이언트로부터 메시지 수신 이벤트 처리
    ws.on('message', (msg)=>{
        console.log(`클라이언트[${ip}]에게 수신한 메시지 : ${msg.toString()}`);
        webSocketServer.clients.forEach(client =>{
          client.send(msg.toString())
        })
        // ws.send('메시지 잘 받았습니다! from 서버')
    })
    
    // 4) 에러 처러
    ws.on('error', (error)=>{
        console.log(`클라이언트[${ip}] 연결 에러발생 : ${error}`);
    })
    
    // 5) 연결 종료 이벤트 처리
    ws.on('close', ()=>{
        console.log(`클라이언트[${ip}] 웹소켓 연결 종료`);
    })
});
