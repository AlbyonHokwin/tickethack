function checkBody(body, keys) {
    return keys.every(key => !!body[key]);
}

module.exports = { checkBody };