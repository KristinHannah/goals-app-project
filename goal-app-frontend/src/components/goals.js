class Goals {
    constructor() {
        this.goals = []
        this.adapter = new GoalsAdapter()
        // this.bindEventListeners()
        this.fetchAndLoadGoals()
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
        goalsContainer.innerHTML = ' my goals here '
    }

}