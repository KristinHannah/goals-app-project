class Actions {
    constructor() {
        this.actions = []
        this.adapter = new ActionsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadActions()
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
    }

    createGoal(e) {
        e.preventDefault()
        const nameValue = this.newGoalBody.value
        const catValue = this.newGoalCat.value
        const userValue = parseInt(this.newGoalUser.value)

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


    render() {
        const goalsContainer = document.getElementById('goals-container')
        goalsContainer.innerHTML = this.goals.map(goal => goal.renderLi()).join('')
    }

}