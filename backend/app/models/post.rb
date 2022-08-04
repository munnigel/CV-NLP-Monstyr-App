class Post < ApplicationRecord
    has_one_attached :image

    APPROVED_STATUS = ["pending", "live"]

    validates :status, presence: true, if: :status_check
    
    private
    def status_check
        unless APPROVED_STATUS.any? { |word| status == word}
        errors.add(:status, "is not a valid status. Status can only be #{APPROVED_STATUS}")
        end
    end
end
