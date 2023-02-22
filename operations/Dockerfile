FROM node:16.0.0 AS build

# Install essential tools
RUN apt-get -qq update && \
  apt-get -qq install sudo && \
  apt-get -qq install apt-transport-https && \
  apt-get -qq install build-essential && \
  apt-get -qq install git

# install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get -qq install -y yarn

ARG GITHUB_TOKEN
COPY operations/.npmrc /tmp/app/.npmrc

COPY src/ /tmp/app/src
COPY package.json /tmp/app
COPY yarn.lock /tmp/app
COPY .env.production /tmp/app
COPY build_config/ /tmp/app/build_config
COPY webpack.config.js /tmp/app

WORKDIR /tmp/app
RUN yarn install
RUN yarn cache clean
RUN yarn build

FROM nginx

COPY --from=build /tmp/app/dist /usr/www
COPY operations/nginx.conf /etc/nginx/nginx.conf
