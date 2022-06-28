class CoffeeIdToCoffeeBean < ActiveRecord::Migration[6.0]
  def change
    add_column :coffee_beans, :coffee_id, :integer
  end
end
