const requireEsm = require('esm')(module)
requireEsm('module-alias/register')
requireEsm('./test/index')
