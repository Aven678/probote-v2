/* eslint-disable no-unused-vars */
const pronote = require('./pronote/index')
const pronote_api = require('pronote-api')

let db = require('./database')

pronote.logIn().catch(err => {
	if (err.code === pronote_api.errors.WRONG_CREDENTIALS.code) {
		console.error('Mauvais identifiants')    
	} else {
		console.error(err)
	}
	process.exit(1)
}).then(loginSession => {
	const { setSession } = require('./config')
    
	setSession(loginSession, function() {
		const { session } = require('./config')
		console.log('[PRONOTE] Logged in as ' + session.user.name + ', ' + session.user.studentClass.name)        
        
		require('./clientsHandler')
    
		pronote.startFetch()
	})
})