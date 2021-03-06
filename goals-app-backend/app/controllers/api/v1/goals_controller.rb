class Api::V1::GoalsController < ApplicationController

  def index
    @goals = Goal.all 
    render json: @goals, include: :actions 
  end

  def show 
    @goal = Goal.find(params[:id])

    render json: @goal, status: 200 
  end 

  def create 
    @goal = Goal.new(goal_params)
    if @goal.save 
      render json: @goal, status: 200 
    end 
  end 

  def update 
    @goal = Goal.find(params[:id])
    @goal.update(goal_params)
    render json: @goal, status: 200 
  end 

  def destroy 
    @goal = Goal.find(params[:id])
    Goal.where(id: params[:id]).destroy_all

   # render json: {goalId: @goal.id}
  end 


  private 

  def goal_params 
    params.require(:goal).permit(:name, :category)
  end 

end
