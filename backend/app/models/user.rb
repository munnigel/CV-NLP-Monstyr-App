class User < ApplicationRecord

    APPROVED_DOMAINS = ["monstyr.com", "mymail.sutd.edu.sg"]

    has_secure_password

    # mount_uploader :avatar, AvatarUploader
    validates :email, presence: true, uniqueness: true, if: :domain_check
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username, presence: true, uniqueness: true
    validates :password,
                length: { minimum: 6 },
                if: -> { new_record? || !password.nil? }

    def domain_check
        unless APPROVED_DOMAINS.any? { |word| email.end_with?(word)}
        errors.add(:email, "is not from a valid domain")
        end
    end
end