class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.boolean :isdone, default: false
      t.string :image, default: '../../app/assets/images/default.png'
      t.timestamps
    end
  end
end
