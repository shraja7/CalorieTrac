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
        this._displayNewMeal(meal);
        this._render()
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._displayNewWorkout(workout);
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
_displayNewMeal(meal) {
    //element where to store/display meal
    const mealsEl = document.querySelector('#meal-items');
    const mealEl = document.createElement('div');
    //add classes to meal element
    mealEl.classList.add('row', 'my-2');
    mealEl.setAttribute('data-id', meal.id);
    mealEl.innerHTML = `
    <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
    </div>
        
              `;

                mealsEl.appendChild(mealEl);

}

_displayNewWorkout(workout) {
    //element where to store/display meal
    const workoutEl = document.createElement('div');
    const workoutsEl = document.querySelector('#workout-items');
    //add classes to meal element
    workoutEl.classList.add('row', 'my-2');
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.innerHTML = `
    <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
    </div>
        
              `;

                workoutsEl.appendChild(workoutEl);

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
        document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'));

        document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));
    }
    _newItem (type, e) {
        e.preventDefault();
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);

        //validate inputs
        if(name.value === '' || calories.value === '') {
            alert('Please fill in all fields');
        }
        //if type is meal or workout
        if(type === 'meal') {
            const meal = new Meal(name.value, +calories.value);
            this._tracker.addMeal(meal);
        }else{
            const workout = new Workout(name.value, +calories.value);
            this._tracker.addWorkout(workout);
        }
        
            name.value = '';
            calories.value = '';
    

        const collapseItem = document.querySelector(`#collapse-${type}`);
        const bsCollapse = new bootstrap.Collapse(collapseItem, {
            toggle: true
        });
    }

    

}

const app = new App();