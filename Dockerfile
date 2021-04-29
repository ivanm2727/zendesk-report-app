# pull official base image
FROM ruby:2.7.2

# Install zat application.
RUN gem install zendesk_apps_tools

# Install node js.
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y build-essential

# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# Copy info.
COPY ./package.json ./package-lock.json ./

# Install dependence first need be components.
WORKDIR /app
RUN rm -rf /app/node_modules/
RUN npm ci

# add app
COPY ./ ./