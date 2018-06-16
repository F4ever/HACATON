import React, {Component} from 'react';
import { render } from 'react-dom';

chrome.tabs.getSelected(null, function(tab) {
    console.log(tab);
});

function modifyDOM() {
    //You can play with your DOM here or check URL against your regex
    // console.log('Tab script:');
    // console.log(document.body);
    return document.body.innerHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('111');
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:');
        console.log(results[0]);
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    function modifyItem() {
        setTimeout(function () {
            let itemName = document.getElementsByTagName('h2')[0].textContent;
            document.getElementsByTagName('h2')[0].textContent = itemName + 'ХЕРНЯ!!!';
        }, 1000);


        return document.getElementsByClassName('products_card popular red')[0].innerHTML;
    }


    let url_parse = tab.url.match('.*e-dostavka.by/#/catalog/item_([0-9]*).html');

    if(url_parse != null){
        chrome.tabs.executeScript({
            code: '(' + modifyItem + ')();' //argument here is a string but function.toString() returns function's code
        }, (results) => {
            console.log(results);
        });
    }

});


render((
    <div><button id="test">TEST!</button></div>

  // <p>Hi</p>
), document.getElementById('app'));


