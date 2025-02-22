FROM fedora:28

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash \
  && dnf install libstdc++ git nano which -y

COPY ./package.json ./package-lock.json ./.nvmrc ./.npmrc /usr/lib/passthequill.com/

WORKDIR /usr/lib/passthequill.com

RUN . /root/.bashrc \
  && nvm install \
  && npm i -g npm@7 \
  && npm ci

COPY ./rest-of-container/. /usr/lib/passthequill.com/

CMD . /root/.bashrc && node server.bundle.js
