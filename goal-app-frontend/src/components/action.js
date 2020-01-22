class Action {
    constructor(actionJSON) {
        this.id = actionJSON.id
        this.name = actionJSON.name
        this.date = actionJSON.date
        this.goal_id = actionJSON.goal_is
    }
    set goal_id(gId) {
        this._goal_id = gId;
    }


}