const webpush = require('web-push')

webpush.setVapidDetails('mailto:pnot@compostomonitor.com',process.env.COMPOSTOPU_VAPID_KEY, process.env.COMPOSTOPR_VAPID_KEY)

module.exports = webpush