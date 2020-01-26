class GoalSerializer < ActiveModel::Serializer
    attributes :id, :name, :category, :actions 

 # def user_id 
 #   self.user_id.name 
 # end 

end
