class AddDateToActions < ActiveRecord::Migration[5.2]
  def change
    add_column :actions, :date, :string
  end
end
