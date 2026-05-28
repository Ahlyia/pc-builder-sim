var ITEMS = null;

const ERRORSOUND = new Audio("assets/error.mp3");
const PURCHASESOUND = new Audio("assets/purchase.mp3");

var money = 100;
var currentInspectingItem = null;

var inventory = {
    "builds": [

    ],
    "parts": [

    ]
}

var screens = {
    "title": null,
    "shop": null,
    "inventory": null,
    "build": null,
    "egulf": null,
    "data": null,
}

var purchaseDebounce = false;

function update(){
    const moneyDisplay = document.getElementById("money-display");

    moneyDisplay.textContent = "$"+money;
}

function attemptPurchase(){
    const purchaseButtonElement = document.getElementById("shop-purchase");

    if(purchaseDebounce) return;

    if (currentInspectingItem) {
        if (money >= currentInspectingItem.price) {
            money -= currentInspectingItem.price;
            inventory.parts.push(structuredClone(currentInspectingItem));

            PURCHASESOUND.load();
            PURCHASESOUND.play();
        } else {
            purchaseDebounce = true;
            purchaseButtonElement.classList.add("somethingwrong");
            purchaseButtonElement.textContent = "Insufficient Funds!";
            ERRORSOUND.play();
            setTimeout(() => {
                purchaseButtonElement.classList.remove("somethingwrong");
                purchaseButtonElement.textContent = "Purchase";
                purchaseDebounce = false;
            },2000);
        }
    } else {
        purchaseButtonElement.classList.add("somethingwrong");
        purchaseButtonElement.textContent = "No item!";
        ERRORSOUND.play();
        purchaseDebounce = true;
        setTimeout(() => {
            purchaseButtonElement.classList.remove("somethingwrong");
            purchaseButtonElement.textContent = "Purchase";
            purchaseDebounce = false;
        },2000);
    }
    update();

    console.log(inventory);
}

function openWindow(windowName){
    for(let key in screens){
        let screen = screens[key];
        if (key == windowName) {
            screen.hidden = false;

            if(windowName == "inventory") {
                loadInventory();
            }
        } else {
            screen.hidden = true;
        }
    }
    update();
}

function unloadInventory(){
    const inventoryParts = document.getElementsByClassName("inventory-item");
    const inventoryBuilds = document.getElementsByClassName("inventory-build");

    Array.from(inventoryParts).forEach((partIcon) => {
        partIcon.remove();
    });
    Array.from(inventoryBuilds).forEach((buildIcon) => {
        buildIcon.remove();
    });
}

function loadInventory(){
    unloadInventory();

    const partsContainer = document.getElementById("inventory-parts");
    const buildsContainer = document.getElementById("inventory-builds");

    inventory.builds.forEach((build) => {
        // TODO PLEASE DO THIS PLEASSEE
    });

    inventory.parts.forEach((part) => {
        const partIcon = document.createElement("img");
        partsContainer.appendChild(partIcon);
        partIcon.className = "inventory-item";
        if(part.frontSprite) {
            partIcon.src = part.frontSprite;
        } else {
            partIcon.src = part.sprite;
        }
    });
}

function loadShop(){
    populateCategory("Cases", "shop-cases");
    populateCategory("Motherboards","shop-motherboards");
    populateCategory("PSUs","shop-PSU");
    populateCategory("GPUs","shop-GPU");
    populateCategory("CPUs","shop-CPU");
    populateCategory("RAM","shop-RAM");
    populateCategory("SSDs","shop-storage")
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

    if(item.backSprite){
        iconElement.src = item.backSprite;
    } else {
        iconElement.src = item.sprite;
    }
    update();
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
    /*screens.shop.hidden = false;
    screens.title.hidden = true;*/

    update();
}

async function loadItems(){
    const response = await fetch("all_items.json");

    ITEMS = await response.json();

    console.log(ITEMS);
}

document.addEventListener("DOMContentLoaded",async ()=> {
    screens.title = document.getElementById("title-page");
    screens.shop = document.getElementById("shop-page-main");
    screens.inventory = document.getElementById("inventory-page");
    screens.egulf = document.getElementById("offers-page");
    screens.build = document.getElementById("build-page");
    screens.data = document.getElementById("data-page");

    await loadItems();

    loadShop();

    ready();
});