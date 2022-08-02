class User < ApplicationRecord

    before_create :confirmation_token
    has_secure_password

    APPROVED_DOMAINS = ["monstyr.com", "mymail.sutd.edu.sg"]

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

    def email_activate
        self.email_confirmed = true
        self.confirm_token = nil
        save!(:validate => false)
    end

    private
    def confirmation_token
        if self.confirm_token.blank?
            self.confirm_token = SecureRandom.urlsafe_base64.to_s
        end
    end
end