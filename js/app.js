class CalorieTracker {
    constructor() {
        this._calorieLimit = 2100;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];

        //display calorie limit
        this._displayCaloriesLimit();
        //display total calories
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
        

    }
    //public methods/api //
    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        this._render()
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._render()
    }

    //private methods//
    _displayCaloriesTotal() {
        const totalCaloriesEl = document.querySelector('#calories-total');
        totalCaloriesEl.innerHTML = this._totalCalories;
    }
    _displayCaloriesLimit () {
        const calorieLimitEl = document.querySelector('#calories-limit');
        calorieLimitEl.innerHTML = this._calorieLimit;
    }
_displayCaloriesConsumed() {
    const caloriesConsumedEl = document.querySelector('#calories-consumed');
   const consumed = this._meals.reduce((acc, meal) => {
         return acc + meal.calories;
   }, 0)
    caloriesConsumedEl.innerHTML = consumed;
}

_displayCaloriesBurned() {
    const caloriesBurnedEl = document.querySelector('#calories-burned');
    const burned = this._workouts.reduce((acc, workout) => {
        return acc + workout.calories;
    }, 0)
    caloriesBurnedEl.innerHTML = burned;
}

_displayCaloriesRemaining() {
    const caloriesRemainingEl = document.querySelector('#calories-remaining');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;
    const progressEl = document.querySelector('#calorie-progress');

    if(remaining < 0) {
        caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
        caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
        //make progress bar red 
        progressEl.classList.remove('bg-success');
        progressEl.classList.add('bg-danger');
    }else {
        caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
        caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
        //progress bar green
        progressEl.classList.remove('bg-danger');
        progressEl.classList.add('bg-success');
    }
}
_displayCaloriesProgress() {
    const progressEl = document.querySelector('#calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100)
    progressEl.style.width = `${width}%`
}

    //render method to display meals and workouts
    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}

class Meal {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class Workout {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

//instantiate clorie tracker
const tracker = new CalorieTracker();
//meal instance
const breakfast = new Meal('Breakfast', 500);
tracker.addMeal(breakfast);

const lunch = new Meal('Lunch', 600);
tracker.addMeal(lunch);

const dinner = new Meal('Dinner', 5000);
tracker.addMeal(dinner);



const run = new Workout('Morning Run', 600);
tracker.addWorkout(run);

console.log(tracker._meals);
console.log(tracker._workouts);
console.log(tracker._totalCalories);