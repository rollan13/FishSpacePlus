var recorder;
var dataR = [];

function download() {
    var blob = new Blob(dataR, {
      type: 'video/webm'
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'simulation.webm';
    a.click();
    window.URL.revokeObjectURL(url);
  }  

//recording
var startRecordBtn = document.getElementById("start-record");
var stopRecordBtn = document.getElementById("stop-record");

var recordingCanvas = document.querySelector("#record-canvas");
var stream = recordingCanvas.captureStream(),
recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

recorder.ondataavailable = function(event) {
    if (event.data && event.data.size) {
        dataR.push(event.data);
    }
};
recorder.onstop = () => {
    download();
};

startRecordBtn.addEventListener("click", function(){
    console.log("started recording");  
    dataR = [];
    recorder.start();
});
stopRecordBtn.addEventListener("click", function(){
    console.log("stopped recording");
    var pauseBtn = document.getElementById("pause-model-btn");
    pauseBtn.click();
    recorder.stop();
});
//end recording
