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
debugFileName="./config/debug.js"

build() {
  if [ -f "${debugFileName}" ]; then
    node node_modules/.bin/webpack --config-register esm --config config/webpack/server.js "$@"
  else
    echo "you need a ./config/debug.js file in order to do this" >&2
    echo "Hint: you can './run create-empty-debug-module' to create an empty one" >&2
  fi
}

case "${command}" in
  build-prod)
    # shellcheck disable=SC2119
    NODE_ENV="production" build ;;

  build-test)
    # shellcheck disable=SC2119
    NODE_ENV="test" build ;;

  create-empty-debug-module)
    echo "export default {}" > "${debugFileName}"
    echo "empty debug config created!" ;;

  dev)
    NODE_ENV="development" build --watch ;;

  lint)
    node node_modules/.bin/eslint --ext .js,.vue -- component config create entry lib log server.js ;;

  '')
    echo 'no command given' >&2 ;;

  *)
    echo "command not found: ${command}" >&2 ;;
esac
