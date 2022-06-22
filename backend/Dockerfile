# Use the official lightweight Ruby image.
# https://hub.docker.com/_/ruby
FROM ruby:2.6.6 AS rails-toolbox

RUN (curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | apt-key add -) && \
    echo "deb https://deb.nodesource.com/node_14.x buster main"      > /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && apt-get install -y nodejs lsb-release

RUN (curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -) && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# Install production dependencies.
WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN apt-get update && apt-get install -y libpq-dev && apt-get install -y python3-distutils
RUN gem install bundler && \
    bundle config set --local deployment 'true' && \
    bundle config set --local without 'development test' && \
    bundle install

# Copy local code to the container image.
COPY . /app

ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
# Redirect Rails log to STDOUT for Cloud Run to capture
ENV RAILS_LOG_TO_STDOUT=true
ENV SECRET_KEY_BASE=cb4bf575265a1c07c573c4b13fe1374e9653f7fbbb3476ad31d37164966562cf23be6f0329bda470746b44c43822ab91791704dae36fac277bca719f7e7d6a55

# pre-compile Rails assets with master key
RUN bundle exec rake assets:precompile


ENV RAILS_ENV=production

RUN bundle exec rake db:create
RUN bundle exec rake db:migrate
RUN bundle exec rake db:seed

EXPOSE 8080
CMD ["bin/rails", "server", "-b", "0.0.0.0", "-p", "8080"]