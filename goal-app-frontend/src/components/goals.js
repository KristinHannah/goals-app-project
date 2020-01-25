class Goals {

    constructor() {
        this.goals = []
        this.adapter = new GoalsAdapter()
        this.actionsAdapter = new ActionsAdapter()
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
        // this.body.addEventListener('blur', this.updateGoal.bind(this), true)
        this.body.addEventListener('submit', (event) => {
            if (event.target.className === 'action-form') {
                this.submitActionForm(event)
            }
        });
    }

    submitActionForm(e) {
        e.preventDefault()

        const actionGoalId = parseInt(e.target.dataset.id)
        const actionNameField = document.getElementById(`new-action-for-${actionGoalId}`)
        const actionDateField = document.getElementById(`new-date-for-${actionGoalId}`)
        const actionName = actionNameField.value
        const actionDate = actionDateField.value
        actionNameField.value = ''
        actionDateField.value = ''
        this.actionsAdapter.createAction(actionName, actionDate, actionGoalId)
        this.render()
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