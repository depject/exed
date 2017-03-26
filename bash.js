var cp = require('child_process')
var Utf8 = require('pull-utf8-decoder')
var pull = require('pull-stream')
var toPull = require('stream-to-pull-stream')
var h = require('hyperscript')

exports.gives = 'command'
exports.create = function (api) {
  return function (cmd) {
    return function (cb) {
      var p = cp.spawn('bash', ['-c', cmd])
      var el = h('pre')
      console.log('bash', cmd, p)

      pull(
        toPull.source(p.stdout),
        Utf8(),
        pull.drain(function (str) {
          console.log(str)
          el.appendChild(document.createTextNode(str))
        })
      )

      p.on('close', function (code) {
        el.appendChild(h('label', 'code: '+code))
      })

      cb(null, el)
    }
  }
}
