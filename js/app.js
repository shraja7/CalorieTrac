class CalorieTracker {
    constructor() {
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories();
        this._meals = Storage.getMeals();
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
        //local storage update
        Storage.updateTotalCalories(this._totalCalories)
        Storage.saveMeal(meal);
        this._displayNewMeal(meal);
        this._render()
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        Storage.updateTotalCalories(this._totalCalories)
        this._displayNewWorkout(workout);
        this._render()
    }

    removeMeal(id) {
        //find index of meal want to remove with id
        const index = this._meals.findIndex(meal => meal.id === id);
        //check it's a match
        if(index !== -1) {
            //remove meal from array
            const meal = this._meals[index];
            //subtract calories from total calories
            this._totalCalories -= meal.calories;
            Storage.updateTotalCalories(this._totalCalories)
            this._meals.splice(index, 1);
            //remove meal from UI
            
            //render
            this._render();
        }
    }

    removeWorkout(id) {
        //find index of meal want to remove with id
        const index = this._workouts.findIndex(workout => workout.id === id);
        //check it's a match
        if(index !== -1) {
            //remove workout from array
            const workout = this._workouts[index];
            //subtract calories from total calories
            this._totalCalories += workout.calories;
            Storage.updateTotalCalories(this._totalCalories)
            this._workouts.splice(index, 1);
            //remove meal from UI
            
            //render
            this._render();
        }
    }

    reset() {
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._render();
    }

    setLimit(calorieLimit) {
        this._calorieLimit = calorieLimit;
        Storage.setCalorieLimit(calorieLimit);
        this._displayCaloriesLimit();
        this._render();
    }

    //load items
    loadItems() {
        this._meals.forEach(meal => this._displayNewMeal(meal));
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
    <div class="card-body ">
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
    <div class="card-body ">
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
class Storage {
    static getCalorieLimit(defaultLimit = 2000){
        let calorieLimit;
        if(localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultLimit;
        }else {
            calorieLimit = +(localStorage.getItem('calorieLimit'));
        }
        return calorieLimit;

    }
//set calorie limit
    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    }
//get total calories
    static getTotalCalories(defaultCalories = 0) {
        let totalCalories;
        if(localStorage.getItem('totalCalories') === null) {
            totalCalories = defaultCalories;
        }else {
            totalCalories = +(localStorage.getItem('totalCalories'));
        }
        return totalCalories;

    }
//update total cals
static updateTotalCalories(calories) {
    localStorage.setItem('totalCalories', calories);
}
//get meals form local storage
static getMeals() {
    let meals;
    if(localStorage.getItem('meals') === null) {
        meals = [];
    }else {
        //pra
        meals = JSON.parse(localStorage.getItem('meals'));
    }
    return meals;

}
//add meal to local storage
static saveMeal(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
}

}



class App {
    constructor() {
        this._tracker = new CalorieTracker();
      this._loadEventListeners();
        this._tracker.loadItems();
    }

    //event listeners
_loadEventListeners() {
    document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'));

    document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));

    document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));
    document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));

    document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal'));
    document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this, 'workout'));

    //get reset button
    document.getElementById('reset').addEventListener('click', this._reset.bind(this));

    //get limit form
    document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this));

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

    _removeItem(type, e) {
        if(e.target.classList.contains('fa-xmark') || e.target.classList.contains('delete')) {
           
        if(confirm('Are you sure?')){
            //get data-id
            const id = e.target.closest('.row').getAttribute('data-id');
            console.log('id: ',id)
           //reomve meal or workout using ternary
           type === 'workout' ?  this._tracker.removeWorkout(id) : this._tracker.removeMeal(id) 
           //remove the item from the dom
           e.target.closest('.row').remove()
        }
        }
    }
    _filterItems(type, e) {
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .row`).forEach(item => {
            const name = item.firstElementChild.textContent;
            if(name.toLowerCase().indexOf(text) !== -1) {
                item.style.display = 'block';
            }else{
                item.style.display = 'none';
            }

            
        }
        )
    }

    _reset() {
        if(confirm('Are you sure?')) {
            this._tracker.reset();
            document.getElementById('meal-items').innerHTML = '';
            document.getElementById('workout-items').innerHTML = '';
            document.getElementById('filter-meals').value = '';
            document.getElementById('filter-workouts').value = '';
        }
    }

    _setLimit(e) {
        e.preventDefault();
        const limit = document.getElementById('limit');
        if(limit.value === '') {
            alert('Please enter a limit');
            return
           
        }
        this._tracker.setLimit(+limit.value);
        limit.value = '';

        //close modal
        const modal = document.getElementById('limit-modal');
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();
    }

}

const app = new App();