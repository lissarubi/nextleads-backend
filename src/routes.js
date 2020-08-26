const express = require('express');
const routes = express.Router();
const sessionController = require('./controllers/sessionController');
const usersController = require('./controllers/usersController');
const leadsController = require('./controllers/leadsController');
const changeLeadItem = require('./controllers/changeLeadItem');
const emailController = require('./controllers/emailController')

routes.post('/session', sessionController.create);

routes.post('/users', usersController.create);
routes.get('/users', usersController.index);

routes.get('/leads', leadsController.index);
routes.post('/leads', leadsController.create);
routes.delete('/leads/:id', leadsController.delete);

routes.put('/changeLeadItem', changeLeadItem.changeItems);

routes.post('/email', emailController.create)

module.exports = routes;
