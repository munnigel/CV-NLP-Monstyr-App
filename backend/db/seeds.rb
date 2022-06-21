# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

pendingPost = [{:score => "1.43243", :img => "First image", :title => "First title", :description => "First description"},
               {:score => "2.43243", :img => "Second image", :title => "Second title", :description => "Second description"},
                {:score => "3.43243", :img => "Third image", :title => "Third title", :description => "Third description"},
                {:score => "4.43243", :img => "Fourth image", :title => "Fourth title", :description => "Fourth description"},
                {:score => "5.43243", :img => "Fifth image", :title => "Fifth title", :description => "Fifth description"},
                {:score => "6.43243", :img => "Sixth image", :title => "Sixth title", :description => "Sixth description"},
                {:score => "7.43243", :img => "Seventh image", :title => "Seventh title", :description => "Seventh description"},
                {:score => "8.43243", :img => "Eighth image", :title => "Eighth title", :description => "Eighth description"},
                {:score => "9.43243", :img => "Nineth image", :title => "Nineth title", :description => "Nineth description"},
                {:score => "10.43243", :img => "Tenth image", :title => "Tenth title", :description => "Tenth description"}]

pendingPost.each do |post|
    PendingPost.create(post)
    end

pending = [{:imgUrl => "First pending", :title => "This is the first pending", :category => "This is the first category", :promotionDate => "This is the first promotion date", :description => "This is the first description"},
           {:imgUrl => "Second pending", :title => "This is the second pending", :category => "This is the second category", :promotionDate => "This is the second promotion date", :description => "This is the second description"},
            {:imgUrl => "Third pending", :title => "This is the third pending", :category => "This is the third category", :promotionDate => "This is the third promotion date", :description => "This is the third description"},
            {:imgUrl => "Fourth pending", :title => "This is the fourth pending", :category => "This is the fourth category", :promotionDate => "This is the fourth promotion date", :description => "This is the fourth description"},
            {:imgUrl => "Fifth pending", :title => "This is the fifth pending", :category => "This is the fifth category", :promotionDate => "This is the fifth promotion date", :description => "This is the fifth description"},
            {:imgUrl => "Sixth pending", :title => "This is the sixth pending", :category => "This is the sixth category", :promotionDate => "This is the sixth promotion date", :description => "This is the sixth description"},
            {:imgUrl => "Seventh pending", :title => "This is the seventh pending", :category => "This is the seventh category", :promotionDate => "This is the seventh promotion date", :description => "This is the seventh description"},
            {:imgUrl => "Eighth pending", :title => "This is the eighth pending", :category => "This is the eighth category", :promotionDate => "This is the eighth promotion date", :description => "This is the eighth description"},
            {:imgUrl => "Nineth pending", :title => "This is the nineth pending", :category => "This is the nineth category", :promotionDate => "This is the nineth promotion date", :description => "This is the nineth description"},
            {:imgUrl => "Tenth pending", :title => "This is the tenth pending", :category => "This is the tenth category", :promotionDate => "This is the tenth promotion date", :description => "This is the tenth description"}]

pending.each do |pending|
    Pending.create(pending)
    end
    
