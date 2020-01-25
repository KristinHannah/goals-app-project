class ActionsAdapter {

    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/actions'
    }

    getActions() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    createAction(nameValue, dateValue, goalValue) {
        const newAction = {
            name: nameValue,
            date: dateValue,
            goal_id: goalValue
        }


        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ newAction }),
        }).then(res => res.json())
    }


    // the following will have issues because of my more than one atts.
    updateActionName(value, id) {
        const newAction = {
            name: value
        }

        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ newAction }),
        }).then(res => res.json())
    }

    updateActionDate(value, id) {
        const newAction = {
            date: value
        }

        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ newAction }),
        }).then(res => res.json())
    }


}
