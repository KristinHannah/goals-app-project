class Api::V1::ActionsController < ApplicationController

    def index 
        @actions = Action.all

        render json: @actions, status: 200 
    end 


    def show 
      @action = Action.find(params[:id])
  
      render json: @action, status: 200 
    end 
  
    def create 
      @action = Action.create(action_params)
  
      render json: @action, status: 200 
      #note.new, if note.save, render json 
    end 
  
    def update 
      @action = Action.find(params[:id])
      @action.update(action_params)
      render json: @action, status: 200 
      #if note.find, then note.update, etc. 
    end 
  
    def destroy 
      @gaction = Action.find(params[:id])
      @action.delete 
  
      render json: {actionId: @action.id}
    end 
  
  
    private 
  
    def action_params 
      params.require(:action).permit(:name, :date, :goal_id)
    end 
  
  end
  