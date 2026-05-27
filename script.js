var ITEMS = null;

var money = 0;
var currentInspectingItem = null;

var inventory = {
    "builds": {

    },
    "parts": {
        
    }
}



var screens = {
    "title": null,
    "shop": null,
    "inventory_parts": null,
    "inventory_builds": null,
    "build": null,
    "egulf": null,
}

function attemptPurchase(){
    
}

function openWindow(windowName){
    for(let key in screens){
        let screen = screens[key];
        if (key == windowName) {
            screen.hidden = false;
        } else {
            screen.hidden = true;
        }
    }
}

function loadShop(){
    populateCategory("Cases", "shop-cases");
    populateCategory("Motherboards","shop-motherboards");
}

function inspectItem(item){
    currentInspectingItem = item;

    const nameElement = document.getElementById("shop-product-name");
    const descElement = document.getElementById("shop-product-desc");
    const priceElement = document.getElementById("shop-product-price");
    const iconElement = document.getElementById("shop-inspector-icon");

    nameElement.textContent = item.name;
    descElement.textContent = item.description;
    priceElement.textContent = "$"+item.price;

    if(item.type == "Case"){
        iconElement.src = item.backSprite;
    } else {
        iconElement.src = item.sprite;
    }
}

function populateCategory(categoryName, elementId){
    const container = document.getElementById(elementId);

    container.innerHTML = "";

    for(const item of ITEMS[categoryName]){
        const itemIcon = document.createElement("img");
        itemIcon.className = "shop-item";
        itemIcon.onclick = () => inspectItem(item);

        if(categoryName == "Cases") {
            itemIcon.src = item.frontSprite;
        } else {
            itemIcon.src = item.sprite;
        }

        container.appendChild(itemIcon);
    }
}

function ready(){
    screens.shop.hidden = false;
    screens.title.hidden = true;
}

async function loadItems(){
    const response = await fetch("all_items.json");

    ITEMS = await response.json();

    console.log(ITEMS);
}

document.addEventListener("DOMContentLoaded",async ()=>{
    screens.title = document.getElementById("title-page");
    screens.shop = document.getElementById("shop-page-main");
    screens.inventory_parts = document.getElementById("inventory-page-parts");
    screens.inventory_builds = document.getElementById("inventory-page-builds");
    screens.egulf = document.getElementById("offers-page");
    screens.build = document.getElementById("build-page");

    await loadItems();

    loadShop();

    ready();
});