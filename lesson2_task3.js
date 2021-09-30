class Hamburger {
    constructor(size, stuffing) {
        if (size === 'small') {
            this.size = size;
            this.price = 50;
            this.calories = 20;
        }
        else if (size === 'big') {
            this.size = size;
            this.price = 100;
            this.calories = 40;
        }
        else {
            alert("Incorrect data")
        }

        if (stuffing === 'cheese') {
            this.stuffing = stuffing;
            this.calories += 20
        }
        else if (stuffing === 'salad') {
            this.stuffing = stuffing;
            this.calories += 5
        }
        else if (stuffing === 'potato') {
            this.stuffing = stuffing;
            this.calories += 10
        }
        this.toppingList = {}
    }
    addTopping(topping) { // Добавить добавку
        if (topping === 'species') {
            this.toppingList.species = {price: 15, calories: 0}
        }
        else if (topping === 'mayo') {
            this.toppingList.mayo = {price: 20, calories: 5}
        }
    }
    removeTopping(topping) { // Убрать добавку
        if (topping in this.toppingList){
            delete this.toppingList[topping]
        }
    }
    getToppings() { // Получить список добавок
        return this.toppingList
    }
    getSize() { // Узнать размер гамбургера
        return this.size
    }
    getStuffing() { // Узнать начинку гамбургера
        return this.stuffing
    }
    calculatePrice() { // Узнать цену
        let totPrice = this.price
        if ('species' in this.toppingList) {
            totPrice += this.toppingList.species.price;
        }
        if ('mayo' in this.toppingList) {
            totPrice += this.toppingList.mayo.price;
        }
        return totPrice
    }
    calculateCalories() { // Узнать калорийность
        let totCalories = this.calories
        if ('species' in this.toppingList) {
            totCalories += this.toppingList.species.calories;
        }
        if ('mayo' in this.toppingList) {
            totCalories += this.toppingList.mayo.calories;
        }
        return totCalories
    }
}

const ham1 = new Hamburger('big', 'cheese')
console.log(ham1)
ham1.addTopping('mayo')
ham1.addTopping('species')
ham1.addTopping('species') //Повторно нельзя добавить
console.log(ham1)
console.log(`The list of toppings: ${ham1.getToppings()}`)
console.log(`The list of stuffing: ${ham1.getStuffing()}`)
ham1.removeTopping('species')
ham1.removeTopping('species')
console.log(ham1)
ham1.addTopping('species')
console.log(ham1)
console.log(`The full price of hamburger: ${ham1.calculatePrice()}`)
console.log(`The full calories of hamburger: ${ham1.calculateCalories()}`)
ham1.removeTopping('species')
ham1.removeTopping('mayo')
console.log(`The full price of hamburger: ${ham1.calculatePrice()}`)
console.log(`The full calories of hamburger: ${ham1.calculateCalories()}`)
