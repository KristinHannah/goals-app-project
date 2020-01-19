class Goals {
    constructor() {
        this.goals = []
        this.adapter = new GoalsAdapter()
        this.bindEventListeners()
        this.fetchAndLoadGoals()
    }

    fetchAndLoadGoals() {
        this.adapter.getGoals().then(goals => {
            console.log(goals)
        })
    }

}