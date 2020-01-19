class Goals {
    constructor() {
        this.goals = []
        this.adapter = new GoalsAdapter()
        // this.bindEventListeners()
        this.fetchAndLoadGoals()
    }

    fetchAndLoadGoals() {
        this.adapter.getGoals().then(goals => {
            goals.forEach(goal => this.goals.push(goal))
        })
            .then(() => { this.render() })
    }

    render() {
        const goalsContainer = document.getElementById('goals-container')
        goalsContainer.innerHTML = ' my goals here '
    }

}