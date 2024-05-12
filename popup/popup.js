function pertowholenum(perstr) {
  return Number(perstr.substring(0, perstr.length - 1))
}
sizepos = {
  top:"20%",
  left:"50%",
  width:"10%",
  height:"10%"
};

var showbutton = document.getElementById("send");
var capturebutton = document.getElementById("capture");

var inputtop = document.getElementById("top");
var inputleft = document.getElementById("left");
var inputwidth = document.getElementById("width");
var inputheight = document.getElementById("height");

// chrome.runtime.getBackgroundPage(function(backgroundPage) {
//   console = backgroundPage.console;
// })

chrome.tabs.query({active: true, currentWindow: true}).then(async function(tabs) {
  const rep = await chrome.tabs.sendMessage(tabs[0].id, {ask: "sizepos"});
  // console.log(rep.farewell);
  sizepos.top = rep.top;
  sizepos.left = rep.left;
  sizepos.width = rep.width;
  sizepos.height = rep.height;
  inputtop.value = pertowholenum(sizepos.top);
  inputleft.value = pertowholenum(sizepos.left);
  inputwidth.value = pertowholenum(sizepos.width);
  inputheight.value = pertowholenum(sizepos.height);
});
// var button = document.createElement("button");
// button.textContent = "test";
showbutton.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}).then(async function(tabs) {
    const rep = await chrome.tabs.sendMessage(tabs[0].id, sizepos);
    // console.log(rep.farewell);
  });
});
capturebutton.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}).then(async function(tabs) {
    chrome.runtime.sendMessage({type: "captureTab"}, function(response) {
      console.log(response)
      if (response.dataUrl) {
        var image = document.getElementById("capture-image");
        image.src = response.dataUrl;
        // (async () => {
        //   const worker = await Tesseract.createWorker("eng");
        //   const data = await worker.recognize(response.dataUrl);
        //   console.log(data.text);
        //   await worker.terminate();
        // })();  
        // Tesseract.createWorker("eng")
      } else {
        alert(response.error);
      }
    })
  })
});

inputtop.addEventListener('mouseup', function() {
  sizepos.top = this.value.toString().concat("%")
  chrome.tabs.query({active: true, currentWindow: true}).then(async function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, sizepos);
  });
});
inputleft.addEventListener('mouseup', function() {
  sizepos.left = this.value.toString().concat("%")
  chrome.tabs.query({active: true, currentWindow: true}).then(async function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, sizepos);
  });
});
inputwidth.addEventListener('mouseup', function() {
  sizepos.width = this.value.toString().concat("%")
  chrome.tabs.query({active: true, currentWindow: true}).then(async function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, sizepos);
  });
});
inputheight.addEventListener('mouseup', function() {
  sizepos.height = this.value.toString().concat("%")
  chrome.tabs.query({active: true, currentWindow: true}).then(async function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, sizepos);
  });
});


document.body.appendChild(showbutton);
document.body.appendChild(capturebutton);
