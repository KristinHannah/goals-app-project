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

        return `<li contenteditable="true" > ${this.name} </li> 
        <li contenteditable="true" > ${this.category} </li>
        <li> ${this.id} </li>
        <li> actions: </li>
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

