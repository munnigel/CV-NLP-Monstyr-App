class User < ApplicationRecord

    before_create :confirmation_token
    has_secure_password
    has_one_attached:image

    APPROVED_DOMAINS = ["monstyr.com", "mymail.sutd.edu.sg", "gmail.com"]
    APPROVED_ACC_TYPES = ["developer", "adminteam"]

    # mount_uploader :avatar, AvatarUploader
    validates :email, presence: true, uniqueness: true, if: :domain_check
    validates :account_type, presence: true, if: :account_type_check
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true,
                length: { minimum: 6 },
                if: -> { new_record? || !password.nil? }

    def account_type_check
        unless APPROVED_ACC_TYPES.any? { |word| account_type == word }
        errors.add(:account_type, "is not a valid account type")
        end
    end

    def domain_check
        unless APPROVED_DOMAINS.any? { |word| email.end_with?(word)}
        errors.add(:email, "is not from a valid domain")
        end
    end

    def email_activate
        self.email_confirmed = true
        # self.confirm_token = nil
        save!(:validate => false)
    end

    private
    def confirmation_token
        if self.confirm_token.blank?
            self.confirm_token = SecureRandom.urlsafe_base64.to_s
        end
    end
end