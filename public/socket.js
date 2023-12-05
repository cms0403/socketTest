const socket = io();
socket.on("dangerData", (dummyData) => {
    let jsonArr = []
    jsonArr.push(JSON.parse(dummyData));
    console.log(jsonArr[0].jsonString);
    opener = window.open(`/popup?randomNum=${jsonArr[0].randomNum}&jsonString=${jsonArr[0].jsonString}&fall=X`, "_blank", "width=800,height=900,menubar=no,toolbar=no")
    socket.emit("checkComplete", "프론트에 노출했습니다.");
})
