import * as express from 'express';

import CalendarEventCtrl from '../controllers/calendar-events';
import CalendarEvent from '../models/calendar-events';

import CatCtrl from '../controllers/cat';
import Cat from '../models/cat';

import UserCtrl from '../controllers/user';
import User from '../models/user';

export default function setRoutes(app){
    const router = express.Router();

    const eventCtrl = new CalendarEventCtrl();
  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();

  // Events
  router.route('/events').get(eventCtrl.getAll);
  router.route('/events/count').get(eventCtrl.count);
  router.route('/event').post(eventCtrl.insert);
  router.route('/event/:id').get(eventCtrl.get);
  router.route('/event/:id').put(eventCtrl.update);
  router.route('/event/:id').delete(eventCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  app.use('/api', router);
}