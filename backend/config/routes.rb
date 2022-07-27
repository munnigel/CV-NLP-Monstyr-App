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
  get '/odlatency', to: 'posts#odlatency'
  get '/ocrlatency', to: 'posts#ocrlatency'
  get '/nerdatelatency', to: 'posts#nerdatelatency'
  get '/nercategorieslatency', to: 'posts#nercategorieslatency'
  get '/nertitlelatency', to: 'posts#nertitlelatency'
  get '/acceptedaiml', to: 'posts#acceptedaiml'
  get '/rejectedaiml', to: 'posts#rejectedaiml'
  get '/posts/taggen/:id', to: 'posts#taggen'
  get '/posts/catgen/:id', to: 'posts#catgen'
  get '/posts/dategen/:id', to: 'posts#dategen'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
