class V1::CoffeeBeansController < ApplicationController
  def index
    coffee_beans = CoffeeBean.all
    render json: coffee_beans
  end

  def update
    coffee_bean = CoffeeBean.find(params[:id])
    if coffee_bean.update(bean_params)
      render json: coffee_bean
    end
  end 

  def create
    coffee_bean = CoffeeBean.new(bean_params)
    if coffee_bean.save
      render json: coffee_bean, status: :created
    else
      render json: coffee_bean.errors, status: :unprocessable_entity
    end
  end

  def destroy
    coffee_bean = CoffeeBean.find(params[:id])
    if coffee_bean.destroy
      render json: coffee_bean
    end
  end

  private
  def bean_params
    params.require(:coffee_bean).permit(
      :beans_name, 
      :purchase_date, 
      :beans_origin, 
      :coffee_aroma, 
      :bitter_taste, 
      :coffee_acidity, 
      :price_yen, 
      :beans_comment
    )
  end
end
