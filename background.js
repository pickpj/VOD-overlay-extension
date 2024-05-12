// fetch("/lib/unpkg/tesseract.min.js")
// import "/lib/unpkg/tesseract.min.js"

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type == "captureTab") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs.length > 0) {
        let tabId = tabs[0].id;
        let currenturl = tabs[0].url;
        if (!currenturl.startsWith("https://www.bing.com")) {
          sendResponse({"error": "Active tab is outside of scope"})
        }
        chrome.tabs.captureVisibleTab(null, {format: "jpeg"}, function(dataUrl) {
          console.log(dataUrl)
          if (dataUrl) {
            sendResponse({"dataUrl": dataUrl});
          } else {
            sendResponse({"error": "Failed to capture the tab"});
          }
        });
      } else {
        sendResponse({"error": "No active tab found"});
      }
    });
    return true;
  }
});



self.execute = ({
  signal,
  lang,
  src,
  accuracy = '4.0.0'
}, report) => new Promise((resolve, reject) => {
  const frame = document.createElement('iframe');
  const id = 'worker-' + Math.random();
  methods[id] = {report, resolve, reject, frame};
  frame.src = chrome.runtime.getURL('/data/engine/index.html?id=' + id);
  frame.style.display = 'none';
  frame.onload = () => frame.contentWindow.postMessage({
    lang,
    src,
    accuracy
  }, '*');
  document.documentElement.append(frame);

  signal.addEventListener('abort', () => frame.remove());
});


// var tess = document.createElement("script");
// tess.setAttribute("src", "lib/tesseract.min.js");
// tess.setAttribute("type", "text/javascript")

// var scan = document.createElement("script");
// scan.setAttribute("src", "scan.js");
// scan.setAttribute("type", "text/javascript")


// document.body.appendChild(tess);
// document.body.appendChild(scan);