class Goals {
    constructor() {
        this.goals = []
        this.adapter = new GoalsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadGoals()
    }

    initBindingsAndEventListeners() {
        this.goalsContainer = document.getElementById('goals-container')
        this.newGoalBody = document.getElementById('new-goal-body')
        this.newGoalCat = document.getElementById('new-goal-cat')
        this.newGoalUser = document.getElementById('new-goal-id')
        this.goalForm = document.getElementById('new-goal-form')
        this.goalForm.addEventListener('submit', this.createGoal.bind(this))
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