Rails.application.routes.draw do
  resources :posts
  resources :photos
  root "photos#index"
  get 'latest', to: 'posts#latest'
  get '/allphotosjson', to: 'photos#allphotosjson'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
