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