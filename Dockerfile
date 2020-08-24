FROM node:10.16-alpine

EXPOSE 8080
CMD ["yarn", "run", "start"]

RUN mkdir -p /opt/app && mkdir /cache
WORKDIR /opt/app

ADD package.json yarn.lock /cache/

RUN cd /cache \
  && yarn config set cache-folder /usr/local/share/.cache/yarn \
  && yarn \
  && cd /opt/app && ln -s /cache/node_modules node_modules \
  && tar czf /.yarn-cache.tgz /usr/local/share/.cache/yarn

COPY . /opt/app