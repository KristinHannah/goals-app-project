class Api::V1::GoalsController < ApplicationController

  def index
    @goals = Goal.all 
    render json: @goals, status: 200 
  end

  def show 
    @goal = Goal.find(params[:id])

    render json: @goal, status: 200 
  end 

  def create 
    @goal = Goal.create(goal_params)
    #note.new, if note.save, render json 
  end 

  def update 
    @goal = Goal.find(params[:id])
    @goal.update(goal_params)
    render json: @goal, status: 200 
    #if note.find, then note.update, etc. 
  end 

  def destroy 
    @goal = Goal.find(params[:id])
    @goal.delete 

    render json: {goalId: @goal.id}
  end 


  private 

  def goal_params 
    params.require(:goal).permit(:name)
  end 

end
