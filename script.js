"use strict";

//                     -------------  Selecting Items --------------

const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

//                          ---------- edit option ------------

let editElement;
let editFlag = false;
let editId = "";

//                      --------------  Listening to events -----------

// submit items
form.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener("click", clearItems);

// Load items
window.addEventListener("DOMContentLoaded", setupItems);

//                                   ------- Functions ---------

// To submit or edit an item
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;

  // let's do some cheating
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    // ** When Submitting item

    createListItems(id, value);

    // display alert
    displayAlert("Item added", "success");

    // show container
    container.classList.add("show-container");

    // add to local storage
    addToLocalStorage(id, value);

    // set back to default
    setToDefault();
  } else if (value && editFlag) {
    // **when Editing an Item

    editElement.innerHTML = value;
    displayAlert("Item edited", "success");
    // Edit local strorage
    editLocalStrorage(editId, value);
    setToDefault();
  } else {
    displayAlert("Please enter value", "danger");
  }
}

// Display Alert Notification
function displayAlert(text, className) {
  alert.textContent = text;
  alert.classList.add(`alert-${className}`);

  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${className}`);
  }, 1000);
}

// set back to default function
function setToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "Submit";
}

// clear items function
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    items.forEach((item) => list.removeChild(item));
  }

  displayAlert("items cleared", "danger");
  container.classList.remove("show-container");
  setToDefault();
  localStorage.removeItem("list");
}

//  Delete function
function deleteItem(e) {
  const deleteElement = e.currentTarget.parentElement.parentElement;
  list.removeChild(deleteElement);
  const id = deleteElement.dataset.id;

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setToDefault();

  // remove from local strorage
  removeFromLocalStrorage(id);
}

//  Edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;

  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitBtn.textContent = "edit";
}

//                           -------- Local strorage ----------
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  // console.log(grocery);
  let items = getLocalStorage();
  // console.log(items);

  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStrorage(id) {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStrorage(id, value) {
  let items = getLocalStorage();

  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

//                                  --------- Set up items of load --------

function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItems(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

// creating items list in the form
function createListItems(id, value) {
  const element = document.createElement("article");
  // add class
  element.classList.add("grocery-item");

  // add id
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);

  element.innerHTML = `
    <p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
        </button>
    </div>`;

  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");

  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);

  // apppend new html
  list.appendChild(element);
}
