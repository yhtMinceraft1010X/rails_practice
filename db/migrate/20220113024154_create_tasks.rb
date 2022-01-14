class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    drop_table :tasks
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.string :image

      t.timestamps
    end
  end
end
