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
                const actClass = `completed-actions actions-for-${this.id}`
                actionsArray.push(`<li data-goal_id=${this.id} data-id=${item.id} class=${actClass} data-name="action"> completed - ${item.name} - ${item.date} 
               <svg width="24" height="24" class="action-erase" data-goal_id=${this.id} data-id=${item.id} xmlns="http://www.w3.org/2000/svg" fill="#000091" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 21h-17l-7-7.972 7-8.028h17v16zm-16.09-14l-5.252 6.023 5.247 5.977h14.095v-12h-14.09zm6.09 4.586l2.586-2.586 1.414 1.414-2.586 2.586 2.586 2.586-1.414 1.414-2.586-2.586-2.586 2.586-1.414-1.414 2.586-2.586-2.586-2.586 1.414-1.414 2.586 2.586z"/></svg> </li>`)
            })
            return actionsArray.join(' ')
        }
    }

    renderLi() {
        const nameId = `new-action-for-${this.id}`
        const dateId = `new-date-for-${this.id}`
        const goalId = `goal-id-for-${this.id}`
        const classId = `${this.id}`
        const classForGoalName = `goal-name ${this.id}`
        const classForGoalCat = `goal-cat ${this.id}`
        const formId = `${this.id} action-form`
        const actionsList = this.creatingActionsList()

        return `
        <li class="goal-class"> 
        <ul>
        <li data-id=${this.id} class=${classForGoalName} data-name="name"> ${this.name} </li>  
        <li data-id=${this.id} class=${classForGoalCat} data-name="category"> ${this.category} </li>
        <br /> 
        <li data-id=${this.id} class=${classId} data-name="actions"> 
        Actions: 
            <ol> ${actionsList} 
            <li> 
            <p class="form-title"> Add New: </p> <form id=${formId} class='action-form' data-id=${this.id}> 
            <p> Action: </p>
            <input type="text" name="name" id= ${nameId} />
            <p> Date: </p>
            <input type="text" name="date" id= ${dateId} /> 
            <input type='submit' /> 
        </form> </li> </ol>
        <br />
        <p> Delete Goal <i class="fas fa-trash-alt goal-erase" data-id=${this.id}></i> </p>
        </li>
        </ul>
        </li>`
    }
}

