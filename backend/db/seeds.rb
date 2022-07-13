# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# movies = [{:title => 'Aladdin', :rating => 'G', :release_date => '25-Nov-1992'},
#     	  {:title => 'The Terminator', :rating => 'R', :release_date => '26-Oct-1984'},
#     	  {:title => 'When Harry Met Sally', :rating => 'R', :release_date => '21-Jul-1989'},
#       	  {:title => 'The Help', :rating => 'PG-13', :release_date => '10-Aug-2011'},
#       	  {:title => 'Chocolat', :rating => 'PG-13', :release_date => '5-Jan-2001'},
#       	  {:title => 'Amelie', :rating => 'R', :release_date => '25-Apr-2001'},
#       	  {:title => '2001: A Space Odyssey', :rating => 'G', :release_date => '6-Apr-1968'},
#       	  {:title => 'The Incredibles', :rating => 'PG', :release_date => '5-Nov-2004'},
#       	  {:title => 'Raiders of the Lost Ark', :rating => 'PG', :release_date => '12-Jun-1981'},
#       	  {:title => 'Chicken Run', :rating => 'G', :release_date => '21-Jun-2000'},
#   	 ]

# movies.each do |movie|
#   Movie.create!(movie)
# end

# posts = [{:img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg', :description => 'This is a description of the free bananas post.', :title => 'Free bananas', :validity_start => '25-May-2022', :validity_end => '27-May-2022', :category => 'food', :tag => 'banana', :ocr_img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg'},
# 			{:img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg', :description => 'This is a description of the free oranges post.', :title => 'Free oranges', :validity_start => '26-May-2022', :validity_end => '19-Feb-2023', :category => 'food', :tag => 'orange', :ocr_img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg'},
# 			{:img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg', :description => 'This is a description of the free apples post.', :title => 'Free apples', :validity_start => '27-May-2022', :validity_end => '1-Dec-2022', :category => 'food', :tag => 'apple', :ocr_img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg'},
# 			{:img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg', :description => 'This is a description of the free pears post.', :title => 'Free pears', :validity_start => '24-May-2022', :validity_end => '15-Jun-2022', :category => 'food', :tag => 'pear', :ocr_img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg'},
# 			{:img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg', :description => 'This is a description of the free durians post.', :title => 'Free durians', :validity_start => '23-May-2022', :validity_end => '30-May-2022', :category => 'food', :tag => 'durian', :ocr_img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg'},
#   	 ]

# posts.each do |post|
#   Post.create!(post)
# end

# livePost = [{:score => "1.43243", :imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "First title", :description => "First description"},
#                {:score => "2.43243", :imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "Second title", :description => "Second description"},
#                 {:score => "3.43243", :imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "Third title", :description => "Third description"},
#                 {:score => "4.43243", :imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "Fourth title", :description => "Fourth description"},
#                 {:score => "5.43243", :imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "Fifth title", :description => "Fifth description"},
#                 {:score => "6.43243", :imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "Sixth title", :description => "Sixth description"},
#                 {:score => "7.43243", :imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "Seventh title", :description => "Seventh description"},
#                 {:score => "8.43243", :imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "Eighth title", :description => "Eighth description"},
#                 {:score => "9.43243", :imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "Nineth title", :description => "Nineth description"},
#                 {:score => "10.43243", :imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "Tenth title", :description => "Tenth description"}]

# livePost.each do |post|
#     Pendingpost.create(post)
#     end

# live = [{:imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/rz994jo06q2no622epzvpm36g0zg", :title => "This is the first live", :category => "This is the first category", :promotionDate => "This is the first promotion date", :description => "This is the first description"},
#            {:imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/lbcjghv23xcy406yv8vydv0j4so8", :title => "This is the second live", :category => "This is the second category", :promotionDate => "This is the second promotion date", :description => "This is the second description"},
#             {:imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/cz4ec8sdvylukkmh5pix01u2m60t", :title => "This is the third live", :category => "This is the third category", :promotionDate => "This is the third promotion date", :description => "This is the third description"},
#             {:imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "This is the fourth live", :category => "This is the fourth category", :promotionDate => "This is the fourth promotion date", :description => "This is the fourth description"},
#             {:imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "This is the fifth live", :category => "This is the fifth category", :promotionDate => "This is the fifth promotion date", :description => "This is the fifth description"},
#             {:imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "This is the sixth live", :category => "This is the sixth category", :promotionDate => "This is the sixth promotion date", :description => "This is the sixth description"},
#             {:imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "This is the seventh live", :category => "This is the seventh category", :promotionDate => "This is the seventh promotion date", :description => "This is the seventh description"},
#             {:imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "This is the eighth live", :category => "This is the eighth category", :promotionDate => "This is the eighth promotion date", :description => "This is the eighth description"},
#             {:imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "This is the nineth live", :category => "This is the nineth category", :promotionDate => "This is the nineth promotion date", :description => "This is the nineth description"},
#             {:imgUrl => "https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg", :title => "This is the tenth live", :category => "This is the tenth category", :promotionDate => "This is the tenth promotion date", :description => "This is the tenth description"}]

# live.each do |live|
#     Livepost.create(live)
#     end


require 'csv'

csv_text = File.read(Rails.root.join('lib', 'seeds', 'data-team-duckies.csv'))
csv = CSV.parse(csv_text,:headers => true, :encoding => 'ISO-8859-1')

csv.each do |row|
  t = Post.new
  t.sp_id = row['sp_id']
  t.pid = row['pid']
  t.content = row['content']
  t.title = row['gen_title']
  t.start_date = row['gen_start_date']
  t.end_date = row['gen_end_date']
  t.images = row['images']
  t.status = 'pending'
  t.save
  puts "#{t.sp_id}, #{t.pid} saved"
end


# CSV.read(Rails.root.join('lib', 'seeds', 'data-team-duckies.csv'), headers: true).each do |row|
#   t = Import.create(row.to_hash)
#   puts "#{t.production}, #{t.episode} saved"
# end


# puts "There are now #{Import.count} rows in the imports table"