Rails.application.routes.draw do
  resources :posts
  resources :photos, :except => [:new]
  resources :pendingposts
  resources :liveposts
  root "posts#index"
  get 'latest', to: 'posts#latest'
  get '/allphotosjson', to: 'photos#allphotosjson'
  get '/allpostsjson', to: 'posts#allpostsjson'
  get '/postsinbatches', to: 'posts#postsinbatches'
  get '/noofposts', to: 'posts#noofposts'
  get '/noofliveposts', to: 'posts#noofliveposts'
  get '/noofpendingposts', to: 'posts#noofpendingposts'
  get '/posts/live/:batch', to: 'posts#livepostsinbatches'
  get '/posts/pending/:batch', to: 'posts#pendingpostsinbatches'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
