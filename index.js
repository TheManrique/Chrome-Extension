let myLeads = [];
const inputBtn = document.querySelector('#input-btn');
const deleteBtn = document.querySelector('#delete-btn');
const inputEl = document.querySelector('#input-el');
const ulEl = document.querySelector('#ul-el');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
const tabBtn = document.querySelector('#tab-btn');


tabBtn.addEventListener('click', function () {
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      renderList(myLeads);
   });
});

if (leadsFromLocalStorage) {
   myLeads = leadsFromLocalStorage;
   renderList(myLeads);
}

function renderList(leadList) {
   let listItems = '';

   for (let key of leadList)
      listItems +=
         '<li><a href="#" target="_blank">' + key + '</a></li>';
   ulEl.innerHTML = listItems;
}

inputBtn.addEventListener('click', function () {
   myLeads.push(inputEl.value);
   inputEl.value = '';
   localStorage.setItem('myLeads', JSON.stringify(myLeads));


   renderList(myLeads);
});

deleteBtn.addEventListener('click', function () {
   localStorage.clear();
   myLeads = [];
   renderList(myLeads);
});
