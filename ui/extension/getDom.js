window.onload = function() {
    chrome.runtime.onMessage.addListener(function(action, _, sendResponse) {
        if (action === "get_product") {
            try{
                var products = window.document.getElementsByClassName('description')[0].getElementsByTagName('span');
                try{
                    var components = window.document.getElementsByClassName('property_3220')[0].getElementsByClassName('value')[0].innerText;
                }catch (err){
                    var components = '';
                }
                var title = window.document.getElementsByClassName('mfp-content')[0].getElementsByClassName('product_card')[0].getElementsByClassName('products_card')[0].innerText;

                sendResponse({
                    id: products[0].innerText,
                    code: products[1].innerText,
                    title: title,
                    components: components.split(".")[0].split(", ")
                });
            }catch (err){
                console.log(err)
            }
        }else{
            if (action.length === 1){
                if (action[0].status > 0){
                    // window.document.getElementsByClassName('lds-dual-ring').remove();
                    window.document.getElementsByClassName('forms')[0].insertAdjacentHTML('beforeend',
                    '<img src="https://mskukraine.com/wp-content/uploads/2017/01/check-circle-768x768.png" style="height: 100px; width: 100px; position: absolute; right: 64px; top: 17px;"/>')
                }
                if (action[0].status <= 0){
                    // window.document.getElementsByClassName('lds-dual-ring').remove();
                    window.document.getElementsByClassName('forms')[0].insertAdjacentHTML('beforeend',
                    '<img src="https://www.ac2news.com/wp-content/uploads/Fail-cc-cc.png" style="height: 100px; width: 100px; position: absolute; right: 64px; top: 17px;"/>')
                }
            }
        }
    });
};
