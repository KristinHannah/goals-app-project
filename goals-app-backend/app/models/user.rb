class User < ApplicationRecord
    has_many :goals 
    has_many :actions, :through => :goals 
    has_secure_password 
end
