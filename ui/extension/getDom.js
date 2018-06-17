window.onload = function() {
    chrome.runtime.onMessage.addListener(function(action, _, sendResponse) {
        if (action === "get_product") {
            try{
                var products = window.document.getElementsByClassName('description')[0].getElementsByTagName('span');
                var components = window.document.getElementsByClassName('property_3220')[0].getElementsByClassName('value');
                var title = window.document.getElementsByClassName('mfp-content')[0].getElementsByClassName('products_card red')[0].getElementsByClassName('title')[0].innerText;

                sendResponse({
                    id: products[0].innerText,
                    code: products[1].innerText,
                    title: title,
                    components: components[0].innerText.split(".")[0].split(", ")
                });
            }catch (err){

            }
        } else{
            sendResponse({});
        }
    });
};
