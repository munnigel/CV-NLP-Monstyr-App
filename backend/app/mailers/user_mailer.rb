class UserMailer < ApplicationMailer
    default from: 'teamrubyduckies@gmail.com'

    def registration_confirmation(user)
        @user = user
        mail(:to => "#{user.name} <#{user.email}>", :subject => "Registration Confirmation")
    end
    
    def welcome_email
      @user = params[:user]
      @url  = 'http://localhost:3000/auth/login'
      mail(to: @user.email, subject: 'Welcome to My Awesome Site')
    end
  end