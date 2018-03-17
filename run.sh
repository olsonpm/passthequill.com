#! /usr/bin/env sh

#
# can't use `npx` because it wants to swallow error output for some reason.  I
#   didn't look too much into it though, meaning it could have something to do
#   with webpack and esm or a combination of all.
#

command="${1}"

case "${command}" in
  dev)
    node node_modules/.bin/webpack --config-register esm --config config/webpack/server.js --watch ;;

  lint)
    node node_modules/.bin/eslint --ext .js,.vue -- component config create entry lib log server.js ;;

  '')
    echo 'no command given' >&2 ;;

  *)
    echo "command not found: ${command}" >&2 ;;
esac
