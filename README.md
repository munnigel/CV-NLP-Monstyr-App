[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7913425&assignment_repo_type=AssignmentRepo)

## _Team 7 (RubyDuckies)- Design Workbook_

Public access link : https://docs.google.com/document/d/1YMKmIOjpvpO_nUn9TZ1Golm0piNVRxc6CtTDen5pzHQ/edit?usp=sharing

## _Google Site containing our Team’s video:_

https://sites.google.com/sutd.edu.sg/rubyduckies/home

# Installation Procedures

### Local macOS Development

- Version of Ruby : 2.7.6
- Version of Rails : 7.0.3

Assuming homebrew is installed:

```
$ brew install rbenv
$ rbenv init
$ rbenv install 2.7.6
$ echo 'export PATH="$HOME/.rbenv/shims:$PATH"' >> ~/.zshrc
```

Close and open a new terminal, then execute the following commands:

```
$ rbenv global 2.7.6
$ rbenv local 2.7.6
$ echo "gem: --no-document" > ~/.gemrc
$ sudo gem install bundler
$ sudo gem install rails
```

Close and open a new terminal, then execute the following commands:

```
$ ruby --version
$ rails --version
```

### for Local Windows OS:

- Version of Ruby : 2.7.6
- Version of Rails : 7.0.3

Use RubyInstaller

# Procedure to run both backend and frontend together

```
chmod u+x ./testapp.sh
./testapp.sh
```

The above code will startup both backend and frontend serve.
Simply open your browser and go to localhost:4200

# Procedures to run Ruby on Rails app

Ensure ruby and rails are installed

- Version of Ruby : 2.7.6
- Version of Rails : 7.0.3

While in the backend folder,

```
$ cd backend
$ rails s
```

# Procedures to run Angular app

Ensure node.js is installed
Download NodeJS: https://nodejs.org/en/download/

While in the frontend folder,

```
$ cd frontend
$ npm install
$ ng serve
```

# Testing with Cucumber

while in backend folder, (make sure u gitpull backend to have updated gemfile dependencies)

To install gems:

```
$ cd backend
$ bundle install
```

Run cucumber

```
$ cd backend
$ ng e2e
```

Click on `.feature` files to run test cases

### For more information on implementing Gherkin steps in Cucumber

[cucumber_steps](cucumber_steps.md)

# Deploying AI

### using

Ensure Maven is installed

To run server:

```
mvn spring-boot:run
```


# Continuous Training

Code can be found in data_workbench/continuous_training

1. Create cloud function using source code in ```cloud-function.py```
2. Create pipeline using Vertex AI Workbench using notebook in ```continuous-training-pipeline.py```
