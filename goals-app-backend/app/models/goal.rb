class Goal < ApplicationRecord
  validates :name, presence: true 
  has_many :actions, dependent: :destroy
end
