function getRandomFood() {
    var foods = [
        "Burgers", "Chinese", "Mediterranean", "Cheesesteaks", "Chicken", "Fast Food", "Vietnamese", "Barbecue",
         "Cafe", "Sushi", "Pizza", "Italian", "Sandwhich", "Salad", "Breakfast", "Ramen"
    ];
    var food = foods[Math.floor(Math.random() * foods.length)]
    return food;
}