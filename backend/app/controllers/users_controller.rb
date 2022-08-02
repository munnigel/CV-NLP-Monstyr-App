class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: [:create, :confirm_email]
    before_action :set_user, only: [:show, :destroy]

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
        if @user.save
            # UserMailer.with(user: @user).welcome_email.deliver_later
            UserMailer.registration_confirmation(@user).deliver
            render json: { account: @user, message: "Please activate your account by following the instructions in the account confirmation email you received to proceed"}, status: :created
        else
            render json: { errors: @user.errors.full_messages },
                   status: :unprocessable_entity
        end
    end

    def confirm_email
        user = User.find_by_confirm_token(params[:id])
        if user
          user.email_activate
          render json: { success: "Welcome to the Sample App! Your email has been confirmed.
          Please sign in to continue." }
        else
          render json: { error: "Sorry. User does not exist" }
        end
    end

    # PUT /users/{username}
    def update
        unless @user.update(user_params)
            render json: { errors: @user.errors.full_messages },
                   status: :unprocessable_entity
        end
    end

    # DELETE /users/{username}
    def destroy
        @user.destroy
    end

    private
        def user_params
            params.permit(:username, :name, :email, :password)
        end

        def set_user
            @user = User.find(params[:id])
        end
end