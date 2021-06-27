const addItem = document.getElementById('add-btn');
const addItemBtn = document.querySelector(".navbar button");
const add = document.querySelector('#add-btn .btn--success');
const cancelBtn = document.querySelector(" #add-btn .btn--passive");
const backdrop = document.getElementById('backdrop');
const entryText = document.getElementById('entry-text');
const ItemUL = document.getElementById('item-list');

const itemList = [];

addItemBtn.addEventListener("click", () =>  {
    addItem.classList.add('visible');
    backdrop.classList.toggle('visible');
});

cancelBtn.addEventListener("click", cancel); 
backdrop.addEventListener("click", cancel);
  
function cancel(){
    addItem.classList.remove('visible');
    backdrop.classList.remove('visible'); 
    clear(); 
}

function clear() {
    document.getElementById('name').value = '';
    document.getElementById('item-image').value = '';
    document.getElementById('description').value ='';
    document.getElementById('category').value ='';
    document.getElementById('quantity').value ='';
}

// localStorage.setItem('Item')


// function removeSection(){
//     if (itemList.length === 0){
//         main-content.style.display = 'block';
//     } else {
//         main-content.style.display = 'none';
//     }
// }

const displayInventory = (itemObj) => {
    const itemLi = document.createElement("li");
    itemLi.className = 'item-element';
    itemLi.innerHTML = `
    <div class = 'item-element__image'> 
         <img src="${itemObj.imageURL}" alt=""> 
    </div>
    <div class = 'item-element__info'>
         <h2>${itemObj.itemTitle}</h2> 
        <p>${itemObj.yourRating}</p>
    </div>
    `;
    itemUL.append(itemLi);
}

add.addEventListener("click", () => {
    const itemName = document.getElementById('name').value;
    const image = document.getElementById('item-image').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const quantity = document.getElementById('quantity').valueAsNumber;

    if (itemName.trim() === '' || image.trim() === '' || description.trim() === '' || category.trim() === '' || isNaN(quantity) || quantity < 1 ){
        alert('Enter valid values');
        return;
    } 
        let item = {
            itemName: name,
            image: item-image,
            description: description,
            category: category,
            quantity: quantity
        }
        itemList.push(item);
        cancel();
        removeSection();
        displayInventory(item);
})  