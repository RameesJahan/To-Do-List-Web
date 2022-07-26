const ipt_main = document.getElementById("add-item-ipt");
const btn_main = document.getElementById("add-item-btn");
const list_main = document.getElementById("main-list");
const ckb_list = document.getElementById("do-checkbox");
const txt_list = document.getElementById("item-text");
const dlt_list = document.getElementById("delete-btn");
const comp_list = document.getElementById("comp-list");

btn_main.addEventListener("click", createLi);

var todo_list = getFromStorage(); //["Wake Up", "Brush" , "Break fast"];
var todo_list_comp = getFromStorageComp(); // get completed to do from storage
console.log(todo_list);
showList();
showListComp();

//add button active or not
ipt_main.onkeyup = () => {
  let enteredValue = ipt_main.value;
  if(enteredValue.trim() != 0) btn_main.classList.add("active");
  else btn_main.classList.remove("active");
}

//creating to do list item
function createLi() {
  todo_list = getFromStorage();
  if (ipt_main.value.trim() != "") {
    todo_list.push(ipt_main.value);
    putToStorage();
    console.log(todo_list);
    showList();
    ipt_main.value = "";
  } 
}

//creating completed to do list item
function createLiComp() {
  todo_list_comp = getFromStorageComp();
}

//delete to do list item
function deleteItem(index) {
  todo_list = getFromStorage();
  todo_list.splice(index, 1);
  putToStorage();
  console.log(index);
  showList();

}

function deleteItemComp(index) {
  todo_list_comp = getFromStorageComp();
  todo_list_comp.splice(index, 1);
  putToStorageComp();
  console.log(index);
  showListComp();
}

//to show main to do list
function showList() {

  let newLi = '';
  if (todo_list.length <= 0) {
    //document.getElementsByClassName("main-list-body").style.display = "none";
    let emptyLi = `<li><p id="item-text" name="item-text" class="item-text">No Tasks</p> </li>`;
    list_main.innerHTML = emptyLi;
    console.log(todo_list.length);
  } else {
    todo_list.forEach((elem, i, arr) => {
      newLi += `<li>
      <input type="checkbox" class="do-checkbox" name="do-checkbox" id="do-checkbox" onchange="check(this,${i})"/>
      <p id="item-text" name="item-text" class="item-text">${elem}</p>
      <button name="delete-btn" id="delete-btn" class="delete-btn" onclick="deleteItem(${i})">
      <i class="fa fa-close"></i>
      </button>
      </li>`;


    });



    list_main.innerHTML = newLi;
  }
}

//to show completed to do list
function showListComp(){
  let newLi = '';
  if (todo_list_comp.length <= 0) {
    //document.getElementsByClassName("main-list-body").style.display = "none";
    let emptyLi = `<li><p id="item-text" name="item-text" class="item-text">No Completed Tasks</p> </li>`;
    comp_list.innerHTML = emptyLi;
    console.log(todo_list_comp.length);
  } else {
    todo_list_comp.forEach((elem, i, arr) => {
      newLi += `<li>
      <input type="checkbox" class="do-checkbox" name="do-checkbox" id="do-checkbox" onchange="check(this,${i})" checked/>
      <p id="item-text" name="item-text" class="item-text">${elem}</p>
      <button name="delete-btn" id="delete-btn" class="delete-btn" onclick="deleteItemComp(${i})">
      <i class="fa fa-close"></i>
      </button>
      </li>`;


    });



    comp_list.innerHTML = newLi;
  }
}

//get to do list from storage
function getFromStorage () {
  let localSData = window.localStorage.getItem("TO_DO");
  let arr = [];
  if (localSData != null) {
    arr = JSON.parse(localSData);
  }
  return arr;
}

//putting to do data to storage
function putToStorage() {
  localStorage.setItem("TO_DO", JSON.stringify(todo_list));
}

//get completed to do list from storage
function getFromStorageComp() {
  let localSData = window.localStorage.getItem("TO_DO_COMP");
  let arr = [];
  if (localSData != null) {
    arr = JSON.parse(localSData);
  }
  return arr;
}

//putting completed to do data to storage
function putToStorageComp() {
  localStorage.setItem("TO_DO_COMP", JSON.stringify(todo_list_comp));
}

//data transfer completed to do <=> to do
function check(elem, ind) {

  todo_list = getFromStorage();
  todo_list_comp = getFromStorageComp();

  if (elem.checked) {
    console.log("checked" + ind);
    todo_list_comp.push(todo_list[ind]);
    todo_list.splice(ind, 1);
    putToStorage();
    putToStorageComp();
    showList();
    showListComp();
  } else {
    console.log("not checked" + ind);
    todo_list.push(todo_list_comp[ind]);
    todo_list_comp.splice(ind, 1);
    putToStorage();
    putToStorageComp();
    showList();
    showListComp();
  }
}

//Pre Loader
window.addEventListener('load', loaderHide);
function loaderHide() {
  let loaderIcon = document.getElementById("loader");
  loaderIcon.classList.add("hide");
}
/*function loaderShow(){
  let loaderIcon = document.getElementById("loader");
  loaderIcon.classList.remove("hide");
}*/