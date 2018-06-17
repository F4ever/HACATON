'use strict';

let server_name = 'http://192.168.1.130:8080';

let div_autorisation = document.getElementById('authorization');
let div_registration = document.getElementById('registration');
let div_home = document.getElementById('home');
let validation_message = document.getElementById('validation_message');
let validation_message1 = document.getElementById('validation_message1');
let components = [];
let disease = [];
let illnessesSelect = document.getElementById('illnesses-select');
let componentsSelect = document.getElementById('components-select');
let illnessesDiv = document.getElementById('illnesses');
let componentsDiv = document.getElementById('components');

chrome.storage.sync.get(['auth', 'bad_components', 'illnesses'], function(result) {
    if(result.auth){
        show(div_home);
        hide(div_autorisation);
        createIllnes({
            bad_components: result.bad_components,
            illnesses: result.illnesses
        });
    }
});

function hide(elem) {
    elem.style.visibility = "hidden";
    elem.style.position = "absolute";
}

function show(elem) {
    elem.style.visibility = 'visible';
    elem.style.position = null;
}

fetch(server_name + '/api/components/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
        credentials: 'include'
    }
).then(function (json) {return json.json()})
    .then(function (json) {
        components = json;

        for (let component of components){
            let option = document.createElement('option');
            option.value = component.id;
            option.innerHTML = component.title;
            componentsSelect.appendChild(option);
        }
    });

fetch(server_name + '/api/disease/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
        credentials: 'include'
    }
).then(function (json) {return json.json()})
    .then(function (json) {
        disease = json;

        for (let component of disease){
            let option = document.createElement('option');
            option.value = component.id;
            option.innerHTML = component.title;
            illnessesSelect.appendChild(option);
        }
    });

// -------------------------------------------------------------

document.getElementById('form1_button').onclick = function (elem) {
    let form = document.getElementById('form1');

    let login = form.elements["login"].value;
    let pass = form.elements["pass"].value;

    fetch(server_name + '/api/login/',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({username: login, password: pass})
        })
        .then(function(res){
            if(res.status != 200){
                throw Error();
            } else {
                hide(div_autorisation);
                hide(validation_message);
                show(div_home);
                return res.json();
            }
        })
        .then(function (res) {
            chrome.storage.sync.set({
                auth: true,
                bad_components: res.bad_components,
                illnesses: res.illnesses
            });
            createIllnes(res);
        })
        .catch(function(res){
            show(validation_message);
        });
    return false;
};

document.getElementById('signup1').onclick = function (elem) {
    let form = document.getElementById('form2');

    let login = form.elements["login"].value;
    let pass = form.elements["pass"].value;

    fetch(server_name + '/api/signup/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({username: login, password: pass})
    }).then(function(res){
            if (res.status != 200){
                throw Error();
            }
            hide(div_registration);
            hide(validation_message1);
            show(div_home);
            return res.json();
        })
        .then(function (res) {
            chrome.storage.sync.set({
                auth: true,
                bad_components: res.bad_components,
                illnesses: res.illnesses
            });
            createIllnes(res);
        })
        .catch(function(res){
            show(validation_message1);
        });
    return false;
};

document.getElementById('logout').onclick = function (elem) {
    fetch(server_name + '/api/logout/',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",
            credentials: 'include',
            // body: JSON.stringify({username: login, password: pass})
        })
        .then(function (res) {
            // if(res.status == 200) {
            chrome.storage.sync.set({
                auth: false,
                bad_components: [],
                illnesses: []
            });
            // chrome.storage.sync.set({auth: false, userHealth: {}})
            hide(div_home);
            show(div_autorisation);
            // }
        })
        .catch(function(res){});
};

document.getElementById('signup').onclick = function () {
    hide(div_autorisation);
    hide(validation_message);
    show(div_registration);
};

document.getElementById('login').onclick = function () {
    show(div_autorisation);
    hide(div_registration);
    hide(validation_message1);
};

illnessesSelect.onchange = function () {
    if (illnessesSelect.options[illnessesSelect.selectedIndex].value === 'null'){
        return;
    }
    let value = illnessesSelect.options[illnessesSelect.selectedIndex].value;
    chrome.storage.sync.get(['illnesses'], function(result) {
        if (result.illnesses.filter((item)=>item.id==value).length==0){
            result.illnesses.push({
                id: value,
                title: illnessesSelect.options[illnessesSelect.selectedIndex].innerHTML
            });
            chrome.storage.sync.set({'illnesses': result.illnesses}, saveBack);

            let option = document.createElement('div');
            option.innerHTML = illnessesSelect.options[illnessesSelect.selectedIndex].innerHTML;
            option.classList.add('list-item');
            option.onclick = () =>{
                //remove element
                chrome.storage.sync.get(['illnesses'], function(result) {
                    let buff = result.illnesses.filter((item)=>item.id!=value);
                    chrome.storage.sync.set({'illnesses': buff}, saveBack);
                });
                option.remove();
            };
            illnessesDiv.appendChild(option);
        }
        illnessesSelect.selectedIndex = 0;
    });
};

componentsSelect.onchange = function () {
    if (componentsSelect.options[componentsSelect.selectedIndex].value === 'null'){
        return;
    }
    let value = componentsSelect.options[componentsSelect.selectedIndex].value;
    chrome.storage.sync.get(['bad_components'], function(result) {
        if (result.bad_components.filter((item)=>item.id==value).length==0){
            result.bad_components.push({
                id: value,
                title: componentsSelect.options[componentsSelect.selectedIndex].innerHTML
            });
            chrome.storage.sync.set({'bad_components': result.bad_components}, saveBack);
            let option = document.createElement('div');
            option.innerHTML = componentsSelect.options[componentsSelect.selectedIndex].innerHTML;
            option.classList.add('list-item');
            option.onclick = () =>{
                //remove element
                chrome.storage.sync.get(['bad_components'], function(result) {
                    let buff = result.bad_components.filter((item)=>item.id!=value);
                    chrome.storage.sync.set({'bad_components': buff}, saveBack);
                });
                option.remove();
            };
            componentsDiv.appendChild(option);
        }
        componentsSelect.selectedIndex = 0;
    });
};

function saveBack() {
    chrome.storage.sync.get(['bad_components', 'illnesses'], function(result) {
        let bad = result.bad_components.map(item=>item.id);
        let ill = result.illnesses.map(item=>item.id);
        fetch(server_name + '/api/profile/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({
                bad_components: bad,
                illnesses: ill
            })
        })
    });
}

function createIllnes(res) {
    for (let com of res.bad_components){
        let option = document.createElement('div');
        option.innerHTML = com.title;
        option.classList.add('list-item');
        option.onclick = () =>{
            //remove element
            chrome.storage.sync.get(['bad_components'], function(result) {
                let buff = result.bad_components.filter((item)=>item.id!=com.id);
                chrome.storage.sync.set({'bad_components': buff}, saveBack);
            });
            option.remove();
        };
        componentsDiv.appendChild(option);
    }
    for (let ill of res.illnesses){
        let option = document.createElement('div');
        option.innerHTML = ill.title;
        option.classList.add('list-item');
        option.onclick = () =>{
            //remove element
            chrome.storage.sync.get(['illnesses'], function(result) {
                let buff = result.illnesses.filter((item)=>item.id!=ill.id);
                chrome.storage.sync.set({'illnesses': buff}, saveBack);
            });
            option.remove();
        };
        illnessesDiv.appendChild(option);
    }
}


