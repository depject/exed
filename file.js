var fs = require('fs')
var h = require('hyperscript')

exports.gives = 'command'

exports.create = function (api) {
  return function (file) {
    return function (cb) {
      fs.stat(file, function (err, stat) {
        if(err || !stat.isFile())
          cb()
        else
          fs.readFile(file, 'utf8', function (err, text) {
            var ta = h('textarea.high', text)
            ta.selectionStart = 0; ta.selectionEnd = 0
            var status = h('pre.status')
            var wrapper = h('div.column.high', {onfocus: function () {
              ta.focus()
            }}, ta, h('div', status))
            var timer
            function pos (ev) {
              clearTimeout(timer)
              timer = setTimeout(function () {
              status.textContent = [ta.selectionStart, ta.selectionEnd].join(', ')
              }, 10)
            }
            ta.onkeydown = pos
            pos()

            //make element focusable
            wrapper.setAttribute('tabindex', '0')

            wrapper.onkeydown = function (ev) {
              console.log(ev.keyCode, ev)
              if(ev.ctrlKey && ev.keyCode == 83) {//ctrl-s, save
                fs.writeFile(file, ta.value, function (err) {
                  if(err) status.textContent = err.message
                  else status.textContent = 'saved '+file+', '+Buffer.byteLength(ta.value)+' bytes'
                })
              }
            }

            cb(null, wrapper)
          })
      })
    }
  }
}











