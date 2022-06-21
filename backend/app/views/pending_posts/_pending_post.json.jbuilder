json.extract! pending_post, :id, :score, :img, :title, :description, :created_at, :updated_at
json.url pending_post_url(pending_post, format: :json)
