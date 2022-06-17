Rails.application.routes.draw do
  namespace :v1 do
    resources :coffee_beams, only: [:create, :destoroy, :index, :update]
  end
end
