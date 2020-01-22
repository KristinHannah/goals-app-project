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