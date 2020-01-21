class Goal {
    constructor(goalJSON) {
        this.id = goalJSON.id
        this.name = goalJSON.name
        this.category = goalJSON.category
        this.user_id = goalJSON.user_id
        // this.actions = goalJSON.actions || []
    }

    renderLi() {
        const formId = `new-action-for-${this.id}`
        const nameId = `new-action-for-${this.id}`
        const dateId = `new-date-for-${this.id}`
        const goalId = `goal-id-for-${this.id}`

        return `<li data-id=${this.id} data-name="name"> ${this.name} </li> 
        <li data-id=${this.id} data-name="category"> ${this.category} </li>
        <li data-id=${this.id} data-name="actions"> actions: </li>
        <form id= ${formId} > 
            <p> Action: </p>
            <input type="text" name="name" id= ${nameId} />
            <br /> 
            <p> Date: </p>
            <input type="text" name="date" id= ${dateId} /> 
            <input type="hidden" name="goal_id" id= ${goalId} value=${this.id} /> 
            <input type='submit' /> 
        </form>`
    }
}

