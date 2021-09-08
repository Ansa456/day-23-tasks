let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
const tabBtn = document.getElementById('tab-btn');


if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener('click', function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        render(myLeads);

    });
});

inputBtn.addEventListener('click', function(){
    if(inputEl.value !== ''){
        myLeads.push(inputEl.value);// array = '['pen','pencil',]'
        inputEl.value = '';
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        render(myLeads);
    }
});

function render(leads) {
    // parameter = argument
    //leads = '['pen','pencil',]'

    let listItems = '';
    for(let i=0;i<leads.length;i++) {
        // leads.length = 2
        listItems += `<li><a target=' _blank' href='${leads[i]}'>${leads[i]}</a></li>`;

    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});