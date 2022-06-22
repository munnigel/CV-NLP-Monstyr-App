class Post < ActiveRecord
  has_one_attached :postimages

#   def self.upload_image()
#     require "google/cloud/storage"
#     gcloud = Google::Cloud.new "Your Project", "service-account.json"
#     storage = gcloud.storage
#     bucket = storage.create_bucket "my_goat_pictures"
#     bucket.create_file "goat.jpg", "uploaded_goat.jpg"
#   end



#   def upload_file local_file_path:, file_name: nil
#     # The ID of your GCS bucket
#     # bucket_name = "your-unique-bucket-name"
  
#     # The path to your file to upload
#     # local_file_path = "/local/path/to/file.txt"
  
#     # The ID of your GCS object
#     # file_name = "your-file-name"

#     bucket_name = "rubyduckies_cloudstorage"
#     local_file_path = "/"
  
#     require "google/cloud/storage"
  
#     storage = Google::Cloud::Storage.new
#     bucket  = storage.bucket bucket_name, skip_lookup: true
  
#     file = bucket.create_file local_file_path, file_name
  
#     puts "Uploaded #{local_file_path} as #{file.name} in bucket #{bucket_name}"
#   end
end
