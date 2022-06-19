[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7913425&assignment_repo_type=AssignmentRepo)

Team 7 (RubyDuckies)- Design Workbook
Public access link : https://docs.google.com/document/d/1YMKmIOjpvpO_nUn9TZ1Golm0piNVRxc6CtTDen5pzHQ/edit?usp=sharing

Google Site containing our Team’s video here:
https://sites.google.com/sutd.edu.sg/rubyduckies/home

# Installation Procedures for Local macOS Development

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
$ ruby --version
$ rails --version
```

# Procedures to run Ruby on Rails app

While in the root directory,

```
$ rails s
```

# Procedures to run Angular app

Assuming node.js is installed

While in the frontend folder,

```
$ npm install
$ ng serve
```
