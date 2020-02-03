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
        this.body.addEventListener('click', (event) => {
            if (event.target.classList.contains('action-erase')) {
                this.deleteActionHandler(event)
            }
            else if (event.target.classList.contains('goal-erase')) {
                this.deleteGoalHandler(event)
            }
        })
    }

    //main change handling 

    updateGoal(e) {
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.dataset.id
        if (li.dataset.name === "name") {
            this.updateNameGoal(newValue, id)
        } else if (li.dataset.name === "category") {
            this.updateCatGoal(newValue, id)
        } else if (li.dataset.name === "action") {
            const goal_id = parseInt(li.dataset.goal_id)
            const actionData = newValue.split('-')
            const actionName = actionData[1]
            const actionDate = actionData[2]
            this.updateActionHandler(actionName, actionDate, id, goal_id)
        }
    }

    //Actions 

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

    updateActionHandler(actionName, actionDate, id, goal_id) {
        const num_action_id = parseInt(id)
        this.actionsAdapter.updateAction(actionName, actionDate, id).then(newAction => {
            const goalOfAction = this.goals.find(x => x.id === goal_id)
            const actionToUpdate = goalOfAction.actions.find(x => x.id === num_action_id)
            actionToUpdate.name = newAction.name
            actionToUpdate.date = newAction.date
            this.render()
        })
    }

    deleteActionHandler(event) {
        const deleteActionButton = event.target
        const id = deleteActionButton.dataset.id
        const goal_id = parseInt(deleteActionButton.dataset.goal_id)
        if (this.confirmDelete() === true) {
            const goalOfAction = this.goals.find(x => x.id === goal_id)
            const actionToUpdate = goalOfAction.actions
            const removeIndex = actionToUpdate.map(function (item) { return item.id; }).indexOf(id);
            actionToUpdate.splice(removeIndex, 1);
            this.actionsAdapter.deleteAction(id)
            this.render()
        }
        else {
            this.render()
        }
    }

    //Goals 
    createGoal(e) {
        e.preventDefault()
        const nameValue = this.newGoalBody.value
        const catValue = this.newGoalCat.value
        this.newGoalBody.value = ''
        this.newGoalCat.value = ''
        this.adapter.createGoal(nameValue, catValue).then(goal => {
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

    updateNameGoal(newValue, id) {
        const num_goal_id = parseInt(id)
        this.adapter.updateGoalName(newValue, id)
            .then(goal => {
                const goalUpdate = this.goals.find(x => x.id === num_goal_id)
                goalUpdate.name = goal.name
                this.render()
            })
    }

    deleteGoalHandler(event) {
        const deleteGoalButton = event.target
        const goal_id = deleteGoalButton.dataset.id
        const num_goal_id = parseInt(goal_id)
        if (this.confirmDelete() === true) {
            const goalToDelete = this.goals.find(item => item.id === num_goal_id)
            goalToDelete.actions = []
            const removeIndex = this.goals.map(function (item) { return item.id; }).indexOf(num_goal_id);
            this.goals.splice(removeIndex, 1);
            this.adapter.deleteGoal(goal_id)
            this.render()
        } else {
            this.render()
        }
    }

    updateCatGoal(newValue, id) {
        const num_goal_id = parseInt(id)
        this.adapter.updateGoalCategory(newValue, id)
            .then(goal => {
                const goaTolUpdate = this.goals.find(x => x.id === num_goal_id)
                goalToUpdate.category = goal.category
                this.render()
            })
    }


    //delete 

    confirmDelete() {
        return confirm('are you sure you want to delete your goal or action?')
    }


    //rendering goals 

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