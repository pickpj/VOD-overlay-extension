
// importScripts("lib/unpkg/tesseract.min.js");
// import "lib/unpkg/tesseract.min.js"

// var tess = document.createElement("script");
// tess.setAttribute("src", "lib/unpkg/tesseract.min.js");
// tess.setAttribute("type", "module")
// document.body.appendChild(tess);


// (async () => {
//   const worker = await tess.createWorker("eng");
//   const data = await worker.recognize(dataUrl);
//   sendResponse(data.text);
//   await worker.terminate();
// })();  

var sizepos = {
  top:"15%",
  left:"25%",
  width:"10%",
  height:"10%"
};

function pertowholenum(perstr) {
  return Number(perstr.substring(0, perstr.length - 1))
}

var layer = document.createElement("div");
layer.style.position = "fixed";
layer.style.zIndex = "999";
layer.style.cursor = "pointer";
layer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
layer.style.display="";


// var videoID = "q4DF3j4saCE";
// var embedURL = "https://www.youtube.com/embed/q4DF3j4saCE" + "?autoplay=1"// + videoID;
var iframe = document.createElement("iframe");
// iframe.style.display = "block";
// iframe.src = embedURL;
iframe.width = "0%";
iframe.height = "0%"; //100%

var button = document.createElement("button");
button.style.marginTop = "20px";
button.style.padding = "10px 20px";
button.style.border = "none";
button.style.borderRadius = "5px";
button.style.backgroundColor = "white";
button.style.color = "black";
button.style.fontSize = "16px";
button.style.fontFamily = "Arial, sans-serif";
button.style.cursor = "pointer";
button.textContent = "Hide";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.ask == "sizepos") {
    layer.style.top = sizepos.top;
    layer.style.left = sizepos.left;
    layer.style.width = sizepos.width;
    layer.style.height = sizepos.height;
    sendResponse(sizepos);
    return true
  }
  if (sender.id == chrome.runtime.id) {
    console.log(request);
    layer.style.display = ""
    layer.style.top = request.top;
    layer.style.left = request.left;
    if (pertowholenum(request.width) <= pertowholenum(request.left) + 10){
      layer.style.width = "10%";
    } else {
      layer.style.width = String(pertowholenum(request.width)-pertowholenum(request.left)).concat("%");
    }
    if (pertowholenum(request.height) <= pertowholenum(request.top) + 10){
      layer.style.height = "10%";
    } else {
      layer.style.height = String(pertowholenum(request.height)-pertowholenum(request.top)).concat("%");
    }
    sizepos.top = request.top;
    sizepos.left = request.left;
    sizepos.width = request.width;
    sizepos.height = request.height;
  }

  return true;
});

button.addEventListener("click", function() {
  layer.style.display = "none";
});

layer.appendChild(iframe);
layer.appendChild(button);
document.body.appendChild(layer);
