Rails.application.routes.draw do
  namespace :v1 do
    resources :coffee_beans, only: [:create, :destoroy, :index, :update]
  end
end
