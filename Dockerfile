FROM fedora:28

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash \
  && dnf install libstdc++ git nano which -y \
  && mkdir -p '/var/log/localhost:7877'

COPY ./container/. /

WORKDIR /usr/lib/passthequill.com

RUN . /root/.bashrc \
  && nvm install \
  && npm i -g npm@7 \
  && npm ci

CMD . /root/.bashrc && node server.bundle.js
