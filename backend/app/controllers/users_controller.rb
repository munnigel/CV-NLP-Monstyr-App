class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: [:create]
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
    def create
        @user = User.new(user_params)
        # @user = User.new(name: params[:name],
        #                  username: params[:username],
        #                  email: params[:email],
        #                  password_digest: BCrypt::Password.create(params[:password]))
        if @user.save
            render json: @user, status: :created
        else
            render json: { errors: @user.errors.full_messages },
                   status: :unprocessable_entity
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