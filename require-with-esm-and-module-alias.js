const requireEsm = require('esm')(module)
requireEsm('module-alias/register')

requireEsm(process.argv[2])
