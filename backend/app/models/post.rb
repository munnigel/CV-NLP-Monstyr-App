class Post < ApplicationRecord
    has_one_attached :image

    def getUnitNo
        self.content
    end


end
