class Goal {
    constructor(goalJSON) {
        this.id = goalJSON.id
        const goalId = this.id
        this.name = goalJSON.name
        this.category = goalJSON.category
        this.user_id = goalJSON.user_id
        this.actions = goalJSON.actions
        if (this.actions !== []) {
            this.actions = []
            goalJSON.actions.forEach(item => {
                let act = new Action(item);
                act.goal_id = goalId;
                this.actions.push(act)
            })
        }
    }

    creatingActionsList() {
        const actionsArray = []
        if (this.actions !== []) {
            const actionsList = `<ol > </ol> `
            this.actions.forEach(item => {
                const actClass = `actions for ${this.id}`
                actionsArray.push(`<li data-id=${this.id} class=${actClass} > completed ${item.name} on ${item.date} </li>`)
            })
            return actionsArray.join(' ')
        }
    }

    renderLi() {
        const nameId = `new-action-for-${this.id}`
        const dateId = `new-date-for-${this.id}`
        const goalId = `goal-id-for-${this.id}`
        const classId = `${this.id}`
        const formId = `${this.id} action-form`
        const actionsList = this.creatingActionsList()

        return `<li data-id=${this.id} class=${classId} data-name="name"> ${this.name} </li> 
        <li data-id=${this.id} class=${classId} data-name="category"> ${this.category} </li>
        <br /> 
        <li data-id=${this.id} class=${classId} data-name="actions"> actions: 
            <ol> ${actionsList} 
            <li> 
            Add New: <form id=${formId} class='action-form' data-id=${this.id}> 
            <p> Action: </p>
            <input type="text" name="name" id= ${nameId} />
            <p> Date: </p>
            <input type="text" name="date" id= ${dateId} /> 
            <input type='submit' /> 
        </form> </li> </ol>
        </li>`
    }
}

