class AddDonestatusToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :donestatus, :string, default: 'false'
  end
end
