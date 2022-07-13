#!/bin/bash
cd frontend/
ng build
gcloud builds submit --tag gcr.io/rubyduckies/rubyduckies-angular-frontend 
gcloud run deploy --image gcr.io/rubyduckies/rubyduckies-angular-frontend --port 4200