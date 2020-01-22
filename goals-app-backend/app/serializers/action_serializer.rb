class ActionSerializer < ActiveModel::Serializer
    attributes :id, :name, :date, :goal_id 
   
    # def user_id 
    #   self.user_id.name 
    # end 
   
   end
   