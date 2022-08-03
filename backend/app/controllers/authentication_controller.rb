class AuthenticationController < ApplicationController

    skip_before_action :authenticate_request

    # POST /auth/login
    def login
        @user = User.find_by_email(params[:email])
        if @user&.authenticate(params[:password])
            if @user.email_confirmed
                token = jwt_encode(user_id: @user.id)
                # render json: { token: token }, status: :ok
                time = Time.now + 24.hours.to_i
                render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                            username: @user.username, id: @user.id }, status: :ok
            else
                render json: { error: 'Please activate your account by following the instructions in the account confirmation email you received to proceed' }
            end
        else
            render json: { error: 'unauthorized'}, status: :unauthorized
        end
    end
end