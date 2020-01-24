class Actions {
    constructor() {
        this.actions = []
        this.adapter = new ActionsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadActions()
    }



}