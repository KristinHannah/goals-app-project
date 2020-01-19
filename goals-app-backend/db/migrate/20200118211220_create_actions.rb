class CreateActions < ActiveRecord::Migration[5.2]
  def change
    create_table :actions do |t|
      t.string :name
      t.date :date
      t.belongs_to :goal, foreign_key: true

      t.timestamps
    end
  end
end
