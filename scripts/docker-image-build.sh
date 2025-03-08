#! /usr/bin/env sh

. ./.env

version=$(jq -r .version < package.json)
imgUri="${docker_package_url}:v${version}"
docker manifest inspect "${imgUri}" > /dev/null 2>&1
if [ $? = 0 ]; then
  echo "version v${version} already exists! not tagging" 1>&2
  exit 1
fi

IS_BUILDING=true ./run build-prod
if [ $? != 0 ]; then
  echo "'./run build-prod' failed.  Exiting" 1>&2
  exit 1
fi

rm -rf ./container

libDir=./container/usr/lib/passthequill.com

mkdir -p "${libDir}"

cp -r assets index.template.html package.json package-lock.json .nvmrc .npmrc dist server.bundle* "${libDir}"
cp -r lib/server/email/templates "${libDir}/email-templates"

docker build --tag "${docker_package_url}:latest" .
docker tag "${docker_package_url}:latest" "${imgUri}"
