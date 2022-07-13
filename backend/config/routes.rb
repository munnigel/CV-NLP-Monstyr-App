Rails.application.routes.draw do
  resources :posts
  resources :photos, :except => [:new]
  resources :pendingposts
  resources :liveposts
  root "photos#index"
  get 'latest', to: 'posts#latest'
  get '/allphotosjson', to: 'photos#allphotosjson'
  get '/allpostsjson', to: 'posts#allpostsjson'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
