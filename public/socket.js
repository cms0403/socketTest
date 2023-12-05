const socket = io();
socket.on("dangerData", (dummyData) => {
    console.log(JSON.parse(dummyData));
    
    socket.emit("checkComplete", "프론트에 노출했습니다.");
})
