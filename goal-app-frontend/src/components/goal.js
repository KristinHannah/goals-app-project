class Goal {
    constructor(goalJSON) {
        this.id = goalJSON.id
        this.name = goalJSON.name
        this.category = goalJSON.category
        this.user_id = goalJSON.user_id
    }
}