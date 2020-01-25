class RemoveDateFromActions < ActiveRecord::Migration[5.2]
  def change
    remove_column :actions, :date
  end
end
