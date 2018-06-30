#! /usr/bin/env sh

#
# TODO: write webpack plugin to return empty modules for select resources.  I've
#   needed something similar to null-loader a few times now but I'm not finding
#   a clean solution.  This new plugin will resolve our config/debug.js
#   hack below.
#

#
# can't use `npx` because it wants to swallow error output for some reason.  I
#   didn't look too much into it though, meaning it could have something to do
#   with webpack and esm or a combination of all.
#

command="${1}"
shift

buildSsrAssets=''

if [ "${command}" = "build-dev" ]; then
  if [ "${1}" = "--include-ssr-assets" ]; then
    buildSsrAssets='true'
    shift
  else
    buildSsrAssets='false'
  fi
fi

if [ "${1}" = "--exclude-ssr-assets" ]; then
  buildSsrAssets='false'
  shift
fi

debugFileName='./config/debug.js'

build() {
  configFile="${1}"
  shift

  node node_modules/.bin/webpack \
    --config-register esm \
    --config "${configFile}" \
    "$@"
}

build_server() {
  if [ -f "${debugFileName}" ]; then
    if [ "${buildSsrAssets}" = 'true' ]; then
      build "config/webpack/ssr.js"
      build "config/webpack/client.js"
    fi

    build "config/webpack/server.js" "$@"
  else
    echo 'you need a ./config/debug.js file in order to do this' >&2
    echo "Hint: you can './run create-empty-debug-module' to create an empty one" >&2
  fi
}

usage() {
  echo './run <command> [args]' >&2
  echo '' >&2
  echo 'commands' >&2
  echo '  build-(prod|test|dev)' >&2
  echo '  (prod|test|dev)' >&2
  echo '  lint' >&2
  echo '  create-empty-debug-module' >&2
}

case "${command}" in
  build-prod)
    NODE_ENV='production' build_server "$@";;

  build-test)
    NODE_ENV='test' build_server "$@" ;;

  build-dev)
    NODE_ENV='development' build_server "$@" ;;

  prod)
    NODE_ENV='production' node server.bundle.js ;;

  test)
    NODE_ENV='test' node server.bundle.js ;;

  dev)
    NODE_ENV='development' node server.bundle.js ;;

  create-empty-debug-module)
    echo 'export default {}' > "${debugFileName}"
    echo 'empty debug config created!' ;;

  lint)
    node node_modules/.bin/eslint --ext .js,.vue -- component config create entry lib log server.js ;;

  '')
    echo 'no command given' >&2
    echo '' >&2
    usage ;;

  *)
    echo "command not found: ${command}" >&2
    echo '' >&2
    usage ;;
esac
