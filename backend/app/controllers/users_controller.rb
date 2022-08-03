class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: [:create, :confirm_email]
    before_action :set_user, only: [:show, :destroy, :update]

    # GET /users
    def index
        @users = User.all
        render json: @users, status: :ok
    end

    # GET /users/{username}
    def show
        render json: @user, status: :ok
    end

    # POST /users
    # def create
    #     @user = User.new(user_params)
    #     # @user = User.new(name: params[:name],
    #     #                  username: params[:username],
    #     #                  email: params[:email],
    #     #                  password_digest: BCrypt::Password.create(params[:password]))
    #     if @user.save
    #         UserMailer.with(user: @user).welcome_email.deliver_later
    #         # UserMailer.registration_confirmation(@user).deliver
    #         render json: @user, status: :created
    #     else
    #         render json: { errors: @user.errors.full_messages },
    #                status: :unprocessable_entity
    #     end
    # end

    def create
        @user = User.new(user_params)
        image = params[:image]
        if @user.save
            if image
                @user.image.attach image if image
                @user.profile_pic = url_for(@user.image)
                @user.save
            end
            # UserMailer.with(user: @user).welcome_email.deliver_later
            UserMailer.registration_confirmation(@user).deliver_later
            render json: { account: @user, message: "Please activate your account by following the instructions in the account confirmation email you received to proceed"}, status: :created
        else
            render json: { errors: @user.errors.full_messages },
                   status: :unprocessable_entity
        end
    end

    def confirm_email
        user = User.find_by_confirm_token(params[:id])
        if user
            if user.email_confirmed == false
                user.email_activate
                render json: { success: "Welcome to Monstyr X AI! Your email has been confirmed.
                Please sign in to continue." }
            else
                render json: { message: "Email has already been activated." }
            end
        else
          render json: { error: "Sorry. User does not exist" }
        end
    end

    # PUT /users/{username}
    # def update
    #     unless @user.update(user_params)
    #         render json: { errors: @user.errors.full_messages },
    #                status: :unprocessable_entity
    #     end
    # end

    def update
        # @user.name = params[:name]
        # @user.password = params[:password]
        @user.account_type = params[:account_type]
        begin
            @user.save
            render json: @user
        rescue ActiveRecord::RecordNotFound => e
            render json: { errors: e.message }, status: :unauthorized
        end
    end

    # DELETE /users/{username}
    def destroy
        @temp_user = @user
        @user.destroy
        render json: @temp_user
    end

    private
        def user_params
            params.permit(:username, :name, :email, :password, :account_type, :image, :profile_pic)
        end

        def set_user
            @user = User.find(params[:id])
        end
end