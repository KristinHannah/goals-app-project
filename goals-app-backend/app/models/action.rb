class Action < ApplicationRecord
  validates :name, presence: true 
  validates :date, presence: true 
  belongs_to :goal
end
