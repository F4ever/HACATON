// background.js
chrome.runtime.onInstalled.addListener(function() {
    fetch('http://192.168.1.130:8080/api/profile/', {
      method: 'GET',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    })
      .then(function (json) {
          if(res.status != 200){
              throw Error();
          }
          return json.json()
      })
      .then(function (data) {
        chrome.storage.sync.set({
            auth: true,
            bad_components: data.bad_components,
            illnesses: data.illnesses
        })
    }).catch(function (){
        chrome.storage.sync.set({
            auth: false
        })
    })
});

function verifyProducts(productList, tabId) {
    fetch('http://192.168.1.130:8080/api/components-validate/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // 'X-CSRFToken': cookie.get('csrftoken')
        },
        body: JSON.stringify(productList)
    })
    .then(function (json) {
        if(res.status != 200){
            throw Error();
        }else{
            return json.json()
        }
    })
    .then(function (data) {
        chrome.tabs.sendMessage(tabId, data);
    })
    .catch(function (data) {})
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab){
    function parseDom(product){
        if (product){
            verifyProducts([product], tabId)
        }
    }

    if (change.status==='complete'){
        window.setTimeout(function () {
            chrome.tabs.sendMessage(tabId, 'get_product', parseDom)
        }, 2000);
    }
});
