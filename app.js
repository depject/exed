var h = require('hyperscript')

exports.needs = {
  command: 'map'
}
exports.gives = 'app'

function first (conts, cb) {

  ;(function next(i) {
    if(i >= conts.length)
      cb(new Error('no matches'))
    else if(!conts[i])
      next(i + 1)
    else
      conts[i](function (err, result) {
        if(err || result) cb(err, result)
        else next(i+1)
      })
  })(0)
}

exports.create = function (api) {
  return function () {
    document.head.appendChild(h('style',
      require('fs').readFileSync(__dirname+'/style.css', 'utf8')))

    var commands =
      h('input.wide', {
        onkeydown: function (ev) {
          if(ev.keyCode === 13) { //enter
            first(api.command(ev.target.value), function (err, el) {
              results.textContent = ''
              if(err) results.appendChild(h('pre', err.stack))
              else {
                results.appendChild(el)
                el.focus()
              }
            })
          }
        }
      })

    var results = h('div.results.wide.high', {
        onkeydown: function (ev) {
          if(ev.keyCode == 27) //esc?
            commands.focus()
        }
      })


    document.body.appendChild(h('div.screen', commands, results))
    return true
  }
}




