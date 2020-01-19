class Goals {
    constructor() {
        this.goals = []
        this.adapter = new GoalsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadGoals()
    }

    initBindingsAndEventListeners() {
        this.goalsContainer = document.getElementById('goals-container')
        this.goalForm = document.getElementById('new-goal-form')
        this.goalForm.addEventListener('submit', this.createGoal)
    }

    createGoal(e) {
        e.preventDefault()
        console.log('goal is being created')
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