FROM node:16-bullseye-slim

WORKDIR /code

COPY ./ .

RUN apt-get update && \
  apt-get install -y --no-install-recommends git ca-certificates

RUN yarn

RUN yarn tailwind:build
RUN yarn ember build --environment=production

FROM busybox

WORKDIR /
RUN mkdir /webapp/

COPY --from=0 /code/dist/ /webapp/

CMD ["#!/bin/cp","-a", "/webapp/.", "/srv/"]
