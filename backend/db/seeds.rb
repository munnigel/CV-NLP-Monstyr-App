# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

movies = [{:title => 'Aladdin', :rating => 'G', :release_date => '25-Nov-1992'},
    	  {:title => 'The Terminator', :rating => 'R', :release_date => '26-Oct-1984'},
    	  {:title => 'When Harry Met Sally', :rating => 'R', :release_date => '21-Jul-1989'},
      	  {:title => 'The Help', :rating => 'PG-13', :release_date => '10-Aug-2011'},
      	  {:title => 'Chocolat', :rating => 'PG-13', :release_date => '5-Jan-2001'},
      	  {:title => 'Amelie', :rating => 'R', :release_date => '25-Apr-2001'},
      	  {:title => '2001: A Space Odyssey', :rating => 'G', :release_date => '6-Apr-1968'},
      	  {:title => 'The Incredibles', :rating => 'PG', :release_date => '5-Nov-2004'},
      	  {:title => 'Raiders of the Lost Ark', :rating => 'PG', :release_date => '12-Jun-1981'},
      	  {:title => 'Chicken Run', :rating => 'G', :release_date => '21-Jun-2000'},
  	 ]

movies.each do |movie|
  Movie.create!(movie)
end

posts = [{:img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg', :description => 'This is a description of the free bananas post.', :title => 'Free bananas', :validity_start => '25-May-2022', :validity_end => '27-May-2022', :category => 'food', :tag => 'banana', :ocr_img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg'},
			{:img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg', :description => 'This is a description of the free oranges post.', :title => 'Free oranges', :validity_start => '26-May-2022', :validity_end => '19-Feb-2023', :category => 'food', :tag => 'orange', :ocr_img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg'},
			{:img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg', :description => 'This is a description of the free apples post.', :title => 'Free apples', :validity_start => '27-May-2022', :validity_end => '1-Dec-2022', :category => 'food', :tag => 'apple', :ocr_img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg'},
			{:img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg', :description => 'This is a description of the free pears post.', :title => 'Free pears', :validity_start => '24-May-2022', :validity_end => '15-Jun-2022', :category => 'food', :tag => 'pear', :ocr_img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg'},
			{:img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg', :description => 'This is a description of the free durians post.', :title => 'Free durians', :validity_start => '23-May-2022', :validity_end => '30-May-2022', :category => 'food', :tag => 'durian', :ocr_img_url => 'https://storage.googleapis.com/rubyduckies_cloudstorage/a_ruby_ducky.jpg'},
  	 ]

posts.each do |post|
  Post.create!(post)
end