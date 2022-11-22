const { Log } = require('../models/log.model')

module.exports = async (user_id, message) => {
    let log = new Log({
        user: user_id,
        information: message
    })
    let new_log = await log.save()
    return new_log
}