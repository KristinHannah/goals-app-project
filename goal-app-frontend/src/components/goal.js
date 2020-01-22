class Goal {
    constructor(goalJSON) {
        this.id = goalJSON.id
        this.name = goalJSON.name
        this.category = goalJSON.category
        this.user_id = goalJSON.user_id
        this.actions = goalJSON.actions
        console.log(goalJSON.actions)
        if (this.actions !== []) {
            this.actions = []
            goalJSON.actions.forEach(item => { this.actions.push(new Action(item)) })
        }
    }

    renderLi() {
        const formId = `new-action-for-${this.id}`
        const nameId = `new-action-for-${this.id}`
        const dateId = `new-date-for-${this.id}`
        const goalId = `goal-id-for-${this.id}`
        const classId = `${this.id}`

        return `<li data-id=${this.id} class=${classId} data-name="name"> ${this.name} </li> 
        <li data-id=${this.id} class=${classId} data-name="category"> ${this.category} </li>
        <br /> 
        <li data-id=${this.id} class=${classId} data-name="actions"> actions: </li>
        <form id= ${formId} class=${classId}> 
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

