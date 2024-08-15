FROM ubuntu:latest

ARG DEBIAN_FRONTEND=noninteractive
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update && \
    apt-get install -y curl build-essential && \
    apt-get clean

RUN mkdir -p /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v20.15.1

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
    . $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm use $NODE_VERSION && \
    nvm alias default $NODE_VERSION

ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

RUN mkdir -p /tmp/react-frontend/

COPY src/ /tmp/react-frontend/src/
COPY public/ /tmp/react-frontend/public/
COPY package-lock.json /tmp/react-frontend/package-lock.json
COPY package.json /tmp/react-frontend/package.json
COPY tsconfig.json /tmp/react-frontend/tsconfig.json

EXPOSE 3000

WORKDIR "/tmp/react-frontend/"
RUN npm install
CMD npm start

