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
        this.body.addEventListener('blur', (event) => {
            if (event.target.tagName === 'LI') {
                this.updateGoal(event)
            }
        }, true)
        this.body.addEventListener('submit', (event) => {
            if (event.target.className === 'action-form') {
                this.submitActionForm(event)
            }
        })
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
        this.actionsAdapter.createAction(actionName, actionDate, actionGoalId).then(newAction => {
            const goalOfAction = this.goals.find(x => x.id === actionGoalId)
            goalOfAction.actions.push(new Action(newAction))
            this.render()
        })
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
                .then(goal => {
                    const goalUpdate = this.goals.find(x => x.id === id)
                    goalUpdate.name = goal.name
                    this.render()
                })
        } else if (li.dataset.name === "category") {
            this.adapter.updateGoalCategory(newValue, id)
                .then(goal => {
                    const goalUpdate = this.goals.find(x => x.id === id)
                    goalUpdate.category = goal.category
                    this.render()
                })
        } else if (li.dataset.name === "action") {
            const goal_id = li.dataset.goal_id
            const actionData = newValue.split(' - ')
            const actionName = actionData[1]
            const actionDate = actionData[2]
            this.actionsAdapter.updateActionName(actionName, id).then(newAction => {
                const goalOfAction = this.goals.find(x => x.id === goal_id)
                const actionToUpdate = goalOfAction.actions.find(x => x.id === id)
                actionToUpdate.name = newAction.name
                this.render()
            })
            this.actionsAdapter.updateActionDate(actionDate, id).then(newAction => {
                const goalOfAction = this.goals.find(x => x.id === goal_id)
                const actionToUpdate = goalOfAction.actions.find(x => x.id === id)
                actionToUpdate.date = newAction.date
                this.render()
            })
        }
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