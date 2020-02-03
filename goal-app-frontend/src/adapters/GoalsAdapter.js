class GoalsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/goals'
    }

    getGoals() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    createGoal(nameValue, catValue) {
        const goal = {
            name: nameValue,
            category: catValue,
        }

        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ goal }),
        }).then(res => res.json())
    }

    updateGoalName(value, id) {
        const goal = {
            name: value
        }

        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ goal }),
        }).then(res => res.json())
    }

    updateGoalCategory(value, id) {
        const goal = {
            category: value
        }

        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ goal }),
        }).then(res => res.json())
    }

    deleteGoal(id) {

        return fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE'
        })

    }

}

