const addItemBtn = document.getElementById('add-item-btn');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const filterAllBtn = document.getElementById('filter-all');
const filterPurchasedBtn = document.getElementById('filter-purchased');
const filterUnpurchasedBtn = document.getElementById('filter-unpurchased');

const items = [];

function renderItems(filter) {
    itemList.innerHTML = "";
    const filteredItems = items.filter(item => {
        if (filter === 'purchased') return item.purchased;
        if (filter === 'unpurchased') return !item.purchased;
        return true; 
    });
    
    for (let i = 0; i < filteredItems.length; i++) {
        const item = filteredItems[i];
        const li = document.createElement('li');
        li.textContent = item.name;
    
        if (item.purchased) {
            li.classList.add('purchased');
        }
    
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
    
        deleteBtn.addEventListener('click', function () {
            items.splice(items.indexOf(item), 1); 
            renderItems(filter); 
        });
    
        li.appendChild(deleteBtn);
        itemList.appendChild(li);
    }
}

filterAllBtn.addEventListener('click', function () {
    renderItems('all');
});
filterPurchasedBtn.addEventListener('click', function () {
    renderItems('purchased');
});
filterUnpurchasedBtn.addEventListener('click', function () {
    renderItems('unpurchased');
});
addItemBtn.addEventListener('click', function () {
    const itemName = itemInput.value.trim();

    if (itemName !== "") {
        const newItem = {
            name: itemName,
            purchased: false
        };

        items.push(newItem);
        renderItems('all'); 
        itemInput.value = "";
    } else {
        alert("Please enter an item name.");
    }
});
