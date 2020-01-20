class GoalsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/goals'
    }

    getGoals() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    createGoal(nameValue, catValue, userValue) {
        const goal = {
            name: nameValue,
            category: catValue,
            user_id: userValue
        }
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ goal })
        }).then(res => res.json())
    }
}

