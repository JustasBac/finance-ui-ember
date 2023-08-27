FROM node:16-bullseye-slim

RUN apt-get update && apt-get install -y \
  apt-transport-https \
  git

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get install -y yarn

WORKDIR /code

COPY ./ .

RUN yarn

RUN yarn ember build --environment=production

FROM alpine:3.10

WORKDIR /
RUN mkdir /webapp/

COPY --from=0 /code/dist/ /webapp/

CMD ["/bin/cp","-a", "/webapp/.", "/srv/"]
