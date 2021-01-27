'use strict';

class Burger {
    constructor(order=undefined) {
        if (!order) { order = "custom"; }
    
        this.order = order;
        this.layers = [];

        this.amount = 0;
        this.calories = 0;
        this._id = 0;

        this.executeOrder(this.order);
    }

    executeOrder(order) {
        order == "custom" ? this.makeCustomOrder(order) : this.makeDirectOrder(order);
    }

    makeCustomOrder(order) {
        // функция получает значения от пользователя через диалог
        // например, пользователь кликает по нужным картинкам и кнопкам
        // формируется заказ и отправляется на расчет
    }

    makeDirectOrder(order) {
        if (order == "big") { this._doStandartBig(); }
        if (order == "little") { this._doStandartLittle(); }
    }

    addLayer(type, quantity=undefined, position=undefined) {
        this._id++;
        const id = this._id;
    
        let layer = new Layer(type, id, quantity);
    
        this._insertToChosenPosition(layer, position);

        this._updateSums();
    }

    removeLayer(id) {
        let arr = [];
        for (const layer of this.layers) {
            if ( layer.id != id ) { arr.push(layer); }
        }
        this.layers = arr;
    }

    changeLayerPosition(id, position) {
        let layer;

        for (const item of this.layers) {
            if (item.id == id) { layer = item; }
        }

        this.removeLayer(id);
        this._insertToChosenPosition(layer, position);
    }

    _insertToChosenPosition(layer, position) {
        if (!position) {
            this.layers.push(layer);
            return;
        }

        let arrStart = [];
        let arrEnd = [layer];

        const layers = this.layers;

        for (const idx in layers) {
            if ( idx < position-1 ) { arrStart.push(layers[idx]); } else { arrEnd.push(layers[idx]); }
        }

        this.layers = arrStart.concat(arrEnd);
    }

    _updateSums() {
        let totalAmount = 0;
        let totalCalories = 0;
    
        for (const layer of this.layers) {
            totalAmount += layer.amount;
            totalCalories += layer.calories;
        }
    
        this.amount = totalAmount;
        this.calories = totalCalories;
    }

    _doStandartBig() {
        this.addLayer("big");
        this.addLayer("mayo");
        this.addLayer("cheeze");
        this.addLayer("salad");
        this.addLayer("mayo");
        this.addLayer("spice");
        this.addLayer("potato");
        this.addLayer("mayo");
        this.addLayer("salad");
        this.addLayer("cheeze");
        this.addLayer("mayo");
        this.addLayer("big");
    }

    _doStandartLittle() {
        this.addLayer("little");
        this.addLayer("mayo");
        this.addLayer("cheeze");
        this.addLayer("spice");
        this.addLayer("potato");
        this.addLayer("cheeze");
        this.addLayer("mayo");
        this.addLayer("little");
    }
}

class Layer {
    constructor(type, id, quantity=undefined) {
        if(!quantity) { quantity = 1; }
    
        this.type = type;
        this.id = id;
        this.quantity = quantity;
    
        this.price = 0;
        this.amount = 0;
        this.calories = 0;

        this._updateSums();
    }

    _updateSums() {
        this._setParams(this.type);
        this.amount = this.price * this.quantity;
        this.calories = this.calories * this.quantity;
    }

    _setParams(type) {
        const layers = this._getLayers();

        for (const layer of layers) {
            if ( layer.type == type ) {
                this.price = layer.price;
                this.calories = layer.calories;
            }
        }
    }

    _getLayers() {
        let layers = [
            {type: "big", price: 100, calories: 40 },
            {type: "little", price: 50, calories: 20 },
            {type: "cheeze", price: 10, calories: 20 },
            {type: "salad", price: 20, calories: 5 },
            {type: "potato", price: 15, calories: 10 },
            {type: "spice", price: 15, calories: 0 },
            {type: "mayo", price: 20, calories: 5 },
        ];
    
        return layers;
    }
}

function addBtnHandler(id) {
    const element = document.getElementById(id);

    element.addEventListener("click", () => {
        let burger = new Burger(id);
        console.log(burger);
    });
}

addBtnHandler("big");
addBtnHandler("little");

// const burger = new Burger();