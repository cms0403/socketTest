const socket_io = require('socket.io');
const io = socket_io();
let dataCheck;
let socketApi = {};
let dummyData = [];
socketApi.io = io;

//5~10초 랜덤으로 dummyData 추가, 노출되는 데이터는 1~10 랜덤으로 노출
addDummyData = (randomNum) => {
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);

    const jsonData = {
        jsonString : `랜덤번호 ${randomNum}입니다.`,
        randomNum : randomNum,
        timestamp : today.toISOString()
    };
    
    dummyData.push(JSON.stringify(jsonData));
    // console.log(dummyData);

    createTimeout();
}

createTimeout = () => {
    const timeout = (Math.floor(Math.random() * 6) + 5);
    const randomNum = Math.floor(Math.random() * 10) + 1;
    console.log(`${timeout}초 뒤에 더미데이터 추가`);
    setTimeout(() => addDummyData(randomNum), timeout * 1000);
};

//더미데이터 추가 및 노출 로직 실행
createTimeout();

io.on('connection', (socket) => {
    const req = socket.request; // 웹소켓과는 달리 req객체를 따로 뽑아야함
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id);

    socket.on('disconnect', () => {
        console.log('클라이언트 접속 해제', ip, socket.id);
        clearInterval(socket.interval);
    });

    socket.on('error', (error) => {
        console.error(error);
    });

    dataCheck ? clearInterval(dataCheck) : '';
    dataCheck = setInterval(() => {
        //여기에 DB 접속하는 코드가 있으면 될것같은데?
        //DB연동은 알아서 하고 일단 더미데이터
        //백에서만 DB를 계속 확인하다가 데이터 들어온거 확인되면 프론트에 보낼거기 때문에
        //더미 데이터 및 DB 확인은 백에서 진행
        
        if(dummyData.length != 0) {
            console.log(dummyData[0]);
            socket.emit('dangerData', dummyData[0]);
        }
    }, 1000); // 1초마다 확인

    socket.on("checkComplete", (data) => {
        console.log(data);
        //페이지에 전송된 더미데이터는 삭제
        //DB에서는 확인유무 YN으로 체크하면 되지않을까?
        dummyData.shift();
    })
});

module.exports = socketApi;