
require('depject/entry')(require('depject')([
  require('./directory'),
  require('./file'),
  require('./bash'),
  require('./app')
]), {app: 'first'}).app()


