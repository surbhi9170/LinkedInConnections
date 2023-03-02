let testButton = document.getElementById("testbutton");
let p = document.getElementById("ember65");
let flag = 0;

//function to start sending connection requests.
function injectTheScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content-script-new.js"],
    });
  });
}

testButton.addEventListener("click", () => {

  if (flag == 0) {
    flag = 1;
    testButton.style.backgroundColor = "rgb(229 60 48)";
    testButton.style.color = "rgb(111 30 24)";
    testButton.textContent = "Stop connecting";
    injectTheScript();
  } else {
    flag = 0;
    testButton.style.backgroundColor = "#3abc3fa6";
    testButton.style.color = "#0e3910";
    testButton.textContent = "Start connecting";

    //to stop sending connection request reloads the page
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["reload.js"],
      });
    });
  }
});
export { flag };
