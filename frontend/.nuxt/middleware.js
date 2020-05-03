const middleware = {}

middleware['admin'] = require('..\\middleware\\admin.js')
middleware['admin'] = middleware['admin'].default || middleware['admin']

middleware['anonymous'] = require('..\\middleware\\anonymous.js')
middleware['anonymous'] = middleware['anonymous'].default || middleware['anonymous']

middleware['authenticated'] = require('..\\middleware\\authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

export default middleware
