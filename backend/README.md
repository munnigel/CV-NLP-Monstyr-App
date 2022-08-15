# Backend Setup

## Ruby version
* Ruby 2.7.6
* Rails 7.0.2

## Configuration

Posts Controller
* Create Vertex AI endpoints for category and title generation
* Enable Vision API for tag generation
* Create service account and json keyfile
* Save json keyfiles to /app
* Enter keys into posts_controller.rb

Mailer
* Change default from: “abcd@gmail.com” to appropriate email that is to send verification email in the application_mailer.rb file

User Model
* Change APPROVED_DOMAINS to appropriate domain names to enable email verification from in user.rb

Services
* Change project_id and keyfile.json to appropriate values, according to Google project / service account in big_query_service.rb
* Change bucket_name in big_query_service.rb to appropriate bucket name

Views
* Change https://deployed-frontend-url.com in user_mailer/registration_confirmation.html.erb to the url of the deployed frontend

Environments
* In /config/environments, change the config.action_mailer.smtp_settings for development, production ruby files to the appropriate email to be used for sending verification emails

Database
* In database.yml, change te production database credentials to the appropriate details of a supported databse, such as Google Cloud SQL

Storage
* In storage.yml, setup Google Cloud Storage by entering the appropriate details of a Cloud Storage bucket

.env
* Modify the variables declared in the .env file to the details of the desired Google Cloud Platform services

## Deployment instructions
* Change the substitutions in cloudbuild.yaml to appropriate values for the endpoint deployment on Google Cloud Run, such as _REGION, _SERVICE_NAME, _INSTANCE_NAME, _SECRET_NAME
* Change versionName in cloudbuild.yaml to the appropriate versionName
* If all has been setup correctly, to deploy the backend on Google Cloud Run, navigate to the /backend directory and run the following command in a CLI that has gCloud CLI installed:
```
gcloud builds submit
```

## Running Locally
Running the backend locally for the first time, with Ruby 2.7.6 installed, navigate to the /backend directory and run:
```
bundle install
rails db:create
rails db:migrate
rails db:seed
rails s
```
For subsequent runs, navigate to the /backend directory and run:
```
rails s
```