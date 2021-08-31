'use strict';

//                     -------------  Selecting Items --------------

const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');


//                          ---------- edit option ------------

let editElement;
let editFlag = false;
let editId = '';


//                      --------------  Listening to events -----------

form.addEventListener('submit', addItem);

// clear items
clearBtn.addEventListener('click', clearItems);


 //                                   ------- Functions ---------

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;

    // let's do some cheating 
    const id = new Date().getTime().toString();

    if (value && !editFlag) {
        
        const element = document.createElement('article');
        // add class
        element.classList.add('grocery-item');

        // add id
        const attr = document.createAttribute('data-id');
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

        // apppend new html
        list.appendChild(element);

        // display alert
        displayAlert('Item added', 'success');

        // show container
        container.classList.add('show-container');

        // add to local storage
        addToLocalStorage(id, value);

        // set back to default
        setToDefault();

    }   
    else if (value && editFlag) {
        console.log('edited item');
    }
    else {
        displayAlert('Please enter value', 'danger');
    }

}

// Display Alert Notification
function displayAlert(text, className){
    alert.textContent = text;
    alert.classList.add(`alert-${className}`);

    // remove alert 
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${className}`)
    }, 1000);
};


// set back to default functipon
function setToDefault(){
   grocery.value = '';
   editFlag = false;
   editId = '';
   submitBtn.textContent = 'Submit';
}


// clear items function
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');

    if(items.length > 0){
        items.forEach(item => list.removeChild(item));
    };
  
    displayAlert('items cleared', 'success');
    container.classList.remove('show-container');
    setToDefault();
    // localStorage.removeItem('list');
}



//                           -------- Local strorage ----------
function addToLocalStorage(id, value){
    console.log('added to local storage');
}