var money = 0;

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



function openWindow(windowName){
    for(let key in screens){
        let screen = screens[key]
        if (key == windowName) {
            screen.hidden = false
        } else {
            screen.hidden = true
        }
    }
}

function ready(){
    screens.title = document.getElementById("title-page");
    screens.shop = document.getElementById("shop-page-main");
    screens.inventory_parts = document.getElementById("inventory-page-parts");
    screens.inventory_builds = document.getElementById("inventory-page-builds");
    screens.egulf = document.getElementById("offers-page");
    screens.build = document.getElementById("build-page");
}

document.addEventListener("DOMContentLoaded",()=>{
    ready();
});