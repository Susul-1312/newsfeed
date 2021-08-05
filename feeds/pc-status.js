var stati = []
const os = require('os');

setInterval(() => {
  stati.push({
    headline: Date.now(),
    content: `Mem: ${os.freemem()}/${os.totalmem()}
    Uptime: ${os.uptime()}`
  })
}, 5000)

module.exports = function() {
  return stati;
}
