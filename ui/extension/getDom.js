window.onload = function() {

    // var css = document.createElement("style");
    // css.type = "text/css";
    // css.innerHTML =
    // '.lds-dual-ring {display: inline-block;width: 64px;height: 64px;}' +
    // '.lds-dual-ring:after {content: " ";display: block;width: 46px;height: 46px;margin: 1px;border-radius: 50%;border: 5px solid #fff;border-color: #fff transparent #fff transparent;animation: lds-dual-ring 1.2s linear infinite;}' +
    // '@keyframes lds-dual-ring {0% {transform: rotate(0deg);}100% {transform: rotate(360deg);}}';
    //
    // document.body.appendChild(css);
    //
    // window.document.getElementsByClassName('forms')[0].insertAdjacentHTML('beforeend',
    //                 '<div class="lds-dual-ring"></div>');

    chrome.runtime.onMessage.addListener(function(action, _, sendResponse) {
        if (action === "get_product") {
            try{
                var products = window.document.getElementsByClassName('description')[0].getElementsByTagName('span');
                var components = window.document.getElementsByClassName('property_3220')[0].getElementsByClassName('value');
                var title = window.document.getElementsByClassName('mfp-content')[0].getElementsByClassName('product_card')[0].getElementsByClassName('products_card')[0].innerText;

                sendResponse({
                    id: products[0].innerText,
                    code: products[1].innerText,
                    title: title,
                    components: components[0].innerText.split(".")[0].split(", ")
                });
            }catch (err){
                console.log(err)
            }
        }else{
            if (action.length === 1){
                if (action[0].status === 1){
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
