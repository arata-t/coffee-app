class CreateCoffeeBeans < ActiveRecord::Migration[6.0]
  def change
    create_table :coffee_beans do |t|
      t.string :beans_name
      t.date :purchase_date
      t.string :beans_origin
      t.integer :coffee_aroma
      t.integer :bitter_taste
      t.integer :coffee_acidity
      t.integer :price_yen
      t.string :beans_comment

      t.timestamps
    end
  end
end
