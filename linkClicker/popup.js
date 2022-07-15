const btnClick = document.querySelector(".btnClick");
const btnData = document.querySelector(".btnData");

btnClick.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: clickLinks,
  });
});

async function clickLinks() {
  try {
    var myLinks = document.getElementsByTagName("a");
    for (var i = 0; i < myLinks.length; i++) {
      // if(window.location.href != myLinks[i].href){
      await myLinks[i].click();
      // }
    }
  } catch (err) {
    console.error(err);
  }
}

btnData.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: stopLinks,
  });
});

async function stopLinks() {
  var a = document.createElement('a');
  var myLinks = document.getElementsByTagName("a");
  var data = [];
  for (var i = 0; i < myLinks.length; i++) {
    var obj = {
      Class: myLinks[i].className,
      Id: myLinks[i].id,
      Link: myLinks[i].href,
      Text: myLinks[i].textContent,
    };
    data.push(obj);
  }
  var json = JSON.stringify(data);
  var file = new Blob([json], { type: 'text/json' });
  a.href = URL.createObjectURL(file);
  a.download = 'datalayer';
  a.click();
}
