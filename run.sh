#! /usr/bin/env sh

#
# TODO: write webpack plugin to return empty modules for select resources.  I've
#   needed something similar to null-loader a few times now but I'm not finding
#   a clean solution.  This new plugin will resolve our config/debug.js
#   hack below.
#
# TODO: add some safety measures for migration-scripts
#   - figure out a way for the migration script to declare what migrations it
#     will run so that when it runs it can confirm with the user.
#   - enforce that each migration declares an assumption prior to running.
#   - automatically back up all databases prior to running a migration.
#

command="${1}"
shift

buildSsrAssets='true'
shouldInitDevServer='true'
useHttps='true'

if [ "${command}" = "build-dev" ]; then
  if [ "${1}" = "--include-ssr-assets" ]; then
    buildSsrAssets='true'
    shouldInitDevServer='false'
    shift
  else
    buildSsrAssets='false'
  fi
fi

if [ "${command}" = "build-test" ]; then
  if [ "${1}" = "--insecure" ]; then
    useHttps='false'
    shift
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

build_migration_script() {
  if [ -f "./migration-scripts/index.js" ]; then
    build "config/webpack/migration-script.js" "$@"
  else
    echo 'you need a ./migration-scripts/index.js file in order to do this' >&2
  fi
}

usage() {
  echo './run <command> [args]' >&2
  echo '' >&2
  echo 'commands' >&2
  echo '  build-(prod|test|dev|migration-script)' >&2
  echo '  (prod|test|dev|migration-script)' >&2
  echo '  lint' >&2
  echo '  create-empty-debug-module' >&2
}

case "${command}" in
  build-prod)
    NODE_ENV='production' build_server "$@";;

  build-test)
    USE_HTTPS="${useHttps}" NODE_ENV='test' build_server "$@" ;;

  build-dev)
    SHOULD_INIT_DEV_SERVER="${shouldInitDevServer}" NODE_ENV='development' build_server "$@" ;;

  build-migration-script)
    NODE_ENV='production' build_migration_script "$@" ;;

  prod)
    NODE_ENV='production' node server.bundle.js ;;

  test)
    NODE_ENV='test' node server.bundle.js ;;

  dev)
    NODE_ENV='development' node server.bundle.js ;;

  migration-script)
    node ./migration-scripts/index.bundle.js ;;

  create-empty-debug-module)
    echo 'export default {}' > "${debugFileName}"
    echo 'empty debug config created!' ;;

  create-local-address-config)
    node -r esm ./lib/scripts/create-local-address-config.js > config/local-address.js
    echo 'local-address config created!' ;;

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
