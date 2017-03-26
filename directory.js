var h = require('hyperscript')
var fs = require('fs')

exports.gives = 'command'

exports.create = function (api) {
  return function (cmd) {
    if(!(cmd[0] == '.' || cmd[0] == '/')) return null

    return function (cb) {
      var list = h('div', h('label', cmd))
      fs.readdir(cmd, function (err, ls) {
        if(err) return cb()
        else list.appendChild(h('ol', ls.map(function (file) { return h('li', file) })))
        cb(null, list)
      })
    }
  }
}







