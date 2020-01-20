class GoalsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/goals'
    }

    getGoals() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    createGoal(value) {
        const goal = {
            name: value
        }
        return fetch(this.baseUrl, {
            method: 'POST',
            name: JSON.stringify({ goal })
        })
    }
}

