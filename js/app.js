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

class App {
    constructor() {
        this._tracker = new CalorieTracker();
        document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this));

        document.getElementById('workout-form').addEventListener('submit', this._newWorkout.bind(this));
    }
    _newMeal (e) {
        e.preventDefault();
        const name = document.getElementById('meal-name');
        const calories = document.getElementById('meal-calories');

        //validate inputs
        if(name.value === '' || calories.value === '') {
            alert('Please fill in all fields');
        }else {
            const meal = new Meal(name.value, +calories.value);
            this._tracker.addMeal(meal);
            name.value = '';
            calories.value = '';
        }

        const collapseMeal = document.querySelector('#collapse-meal');
        const bsCollapse = new bootstrap.Collapse(collapseMeal, {
            toggle: true
        });
    }

    _newWorkout (e) {
        e.preventDefault();
        const name = document.getElementById('workout-name');
        const calories = document.getElementById('workout-calories');

        //validate inputs
        if(name.value === '' || calories.value === '') {
            alert('Please fill in all fields');
        }else {
            const workout = new Workout(name.value, +calories.value);
            this._tracker.addWorkout(workout);
            name.value = '';
            calories.value = '';
        }

        const collapseWorkout = document.querySelector('#collapse-workout');
        const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
            toggle: true
        });
    }

}

const app = new App();