let trig_add = document.getElementById('trig_add');
let backdrop = document.getElementById('backdrop');
let form = document.getElementById('addForm')
let close_form = document.getElementById('close-form');
let btn_add_item = document.getElementById('btn_add')
let btn_update_item = document.getElementById('btn_update')
let btn_clear_fields = document.getElementById('btn_delete')

let input_item = document.getElementById('input_item_name')
let input_qty = document.getElementById('input_item_qty')
let input_cate = document.getElementById('input_item_cate')
let input_desc = document.getElementById('input_item_desc')

lbl_num_items = document.getElementById('lbl_num_items')
lbl_cate_num = document.getElementById('lbl_cate_num')
lbl_stocked_items = document.getElementById('lbl_num_stocked')

let table = document.getElementsByTagName('table')[0];
let tbody = table.lastElementChild;

let hot_id = ''; 

trig_add.addEventListener('click',()=>{
    backdrop.classList.toggle('visible');
    form.style.display = 'block';   
    btn_add_item.style.visibility = 'visible' ;
    btn_update_item.style.visibility = 'hidden';
    console.log(btn_update_item)
});

let updateRow = (btn)=>{
    backdrop.classList.toggle('visible');
    form.style.display = 'block'
    btn_update_item.style.visibility = 'visible'
    btn_add_item.style.visibility = 'hidden';
    
    let parent = btn.parentElement;
    let data = {
        id:parent.children[0].innerHTML,
        name:parent.children[1].innerHTML,
        qty:parent.children[2].innerHTML,
        cate:parent.children[3].innerHTML,
        desc:parent.children[4].innerHTML
    }
        hot_id= data.id;//receives and pass one current updating row

        input_item.value = data.name;
        input_qty.value = data.qty;
        input_cate.value = data.cate;
        input_desc.value = data.desc;    
}

backdrop.addEventListener('click',()=>{
    let isClose = confirm("Do you want to close?")
    if(isClose){
         backdrop.classList.toggle('visible');
         form.style.display = 'none'
    }
})
close_form.addEventListener('click',()=>{
    let isClose = confirm("Do you want to close?")
    if(isClose){
         backdrop.classList.toggle('visible');
         form.style.display = 'none'
    }   
})
btn_add_item.addEventListener('click',()=>{
    let myInventory_data = [];
    if(localStorage.getItem('inventory_items') != null){
        myInventory_data = JSON.parse(localStorage.getItem('inventory_items'));       
    }

    let input_data = {
        item_id: Math.floor(Math.random() * 5000) +1000 + '',
        item_name:input_item.value,
        item_qty:input_qty.value,
        item_cate:input_cate.value,
        item_desc:input_desc.value,
    }
    
    myInventory_data.push(input_data);
    localStorage.setItem('inventory_items',JSON.stringify(myInventory_data));
    loadData();
});

let deleteRow=(aDelete)=>{
    let row = aDelete.parentElement;
    let myInventory_data = [];
    if(localStorage.getItem('inventory_items') != null){
        myInventory_data = JSON.parse(localStorage.getItem('inventory_items'));       
    }
    let selected_id = row.firstElementChild.innerHTML
    myInventory_data.find((value,index)=>{
        if(value.item_id == selected_id){
           myInventory_data.pop(index)
        }
        localStorage.setItem('inventory_items',JSON.stringify(myInventory_data));
        loadData();
    })   
}

btn_update_item.addEventListener('click',()=>{
    let myInventory_data = [];
    if(localStorage.getItem('inventory_items') != null){
        myInventory_data = JSON.parse(localStorage.getItem('inventory_items'));       
    }

    let input_data = {
        item_id: hot_id,
        item_name:input_item.value,
        item_qty:input_qty.value,
        item_cate:input_cate.value,
        item_desc:input_desc.value,
    }
    
    myInventory_data.find((value,index)=>{
        // console.log(value.id)
        if(value.item_id==hot_id){
            myInventory_data[index] = input_data;
        }else{
            console.log('no find')
        }
    })
    localStorage.setItem('inventory_items',JSON.stringify(myInventory_data));
    loadData();
})

let getRow = (dataObj) =>{
    let row = document.createElement('tr');
    row.style.background = dataObj.item_qty == 0 ? 'red' : (dataObj.item_qty >=1 && dataObj.item_qty < 21 )? 'orange' : 'green';
     row.innerHTML = `
     <td>${dataObj.item_id}</td>
     <td>${dataObj.item_name}</td>
     <td>${dataObj.item_qty}</td>
     <td>${dataObj.item_cate}</td>
     <td>${dataObj.item_desc}</td>
     <td onClick = updateRow(this)><i class="fas fa-external-link-square-alt"></i></td>
     <td onClick = deleteRow(this) ><i class="fas fa-trash"></i></td>
    `
    return row;
}

loadData = () =>{
    let myInventory_data = [];
    if(localStorage.getItem('inventory_items') != null){
        myInventory_data = JSON.parse(localStorage.getItem('inventory_items'));       
    }
    tbody.innerHTML =''
    for(row of myInventory_data){
        tbody.append(getRow(row))
    }
}

load_summaries=()=>{
    let myInventory_data = [];
    if(localStorage.getItem('inventory_items') != null){
        myInventory_data = JSON.parse(localStorage.getItem('inventory_items'));       
    }
    let num_items = 0;
    let num_cate = 0;
    let num_stocked = 0;
    tbody.innerHTML =''
    for(row of myInventory_data){
       num_items++;
       if(row.item_qty > 0){
        num_stocked++;
       }
    }

    lbl_num_items.innerHTML = +num_items;
    lbl_stocked_items.innerHTML = +num_stocked;
}
load_summaries();
loadData();
