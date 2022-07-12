json.partial! "photos/photo", photo: @photo
json.extract! @photos, :id, :image, :caption, :picture, :created_at, :updated_at