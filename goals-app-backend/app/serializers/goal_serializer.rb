class GoalSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :user_id 

  def user_id 
    self.oject.user.name 
  end 
end
