class Goals {

    constructor() {
        this.goals = []
        this.adapter = new GoalsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadGoals()
    }


    initBindingsAndEventListeners() {
        this.goalsContainer = document.getElementById('goals-container')
        this.body = document.querySelector('body')
        this.newGoalBody = document.getElementById('new-goal-body')
        this.newGoalCat = document.getElementById('new-goal-cat')
        this.newGoalUser = document.getElementById('new-goal-id')
        this.goalForm = document.getElementById('new-goal-form')
        this.goalForm.addEventListener('submit', this.createGoal.bind(this))
        this.goalsContainer.addEventListener('dblclick', this.handleGoalClick.bind(this))
        this.body.addEventListener('blur', this.updateGoal.bind(this), true)
        //  this.buttonsArray = document.querySelectorAll('button')
        //  this.buttonsArray.forEach(function (elem) {
        //      elem.addEventListener("submit", function () {
        //          this.showForm(elem)
        //      })
        //  })
        //   this.actionForms = document.getElementsByClassName("action-form")
        //  Array.from(this.actionForms).forEach((elem) => {
        //     elem.addEventListener('submit', this.submitForm.bind(this), true)
        // })
        document.addEventListener('submit', function (event) {
            if (event.target.classList.contains('action-form')) {
                submitForm(event)
            }
        }, false);
    }


    submitForm(e) {
        e.preventDefault()
        console.log(e.target)
    }

    createGoal(e) {
        e.preventDefault()
        const nameValue = this.newGoalBody.value
        const catValue = this.newGoalCat.value
        const userValue = parseInt(this.newGoalUser.value)
        this.newGoalBody.value = ''
        this.newGoalCat.value = ''
        this.adapter.createGoal(nameValue, catValue, userValue).then(goal => {
            this.goals.push(new Goal(goal))
            this.render()
        })
    }

    handleGoalClick(e) {
        const li = e.target
        li.contentEditable = true
        li.focus()
        li.classList.add('editable')
    }

    updateGoal(e) {
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.dataset.id
        if (li.dataset.name === "name") {
            this.adapter.updateGoalName(newValue, id)
        } else if (li.dataset.name === "category") {
            this.adapter.updateGoalCategory(newValue, id)
        }
        this.render()
    }

    fetchAndLoadGoals() {
        this.adapter.getGoals()
            .then(goals => {
                goals.forEach(goal => this.goals.push(new Goal(goal)))
                console.log(this.goals)
            })
            .then(() => {
                this.render()
            })
    }

    render() {
        const goalsContainer = document.getElementById('goals-container')
        goalsContainer.innerHTML = this.goals.map(goal => goal.renderLi()).join('')
    }

}