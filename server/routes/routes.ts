import * as express from 'express';

import CalendarEventCtrl from '../controllers/calendar-events';
import CalendarEvent from '../models/calendar-events';

import CatCtrl from '../controllers/cat';
import Cat from '../models/cat';

import HeroCtrl from '../controllers/hero';
import Hero from '../models/hero';

export default function setRoutes(app){
    const router = express.Router();

    const eventCtrl = new CalendarEventCtrl();
  const catCtrl = new CatCtrl();
  const heroCtrl = new HeroCtrl();

  // Events
  router.route('/events').get(eventCtrl.getAll);
  router.route('/events/count').get(eventCtrl.count);
  router.route('/event').post(eventCtrl.insert);
  router.route('/event/:id').get(eventCtrl.get);
  router.route('/event/:id').put(eventCtrl.update);
  router.route('/event/:id').delete(eventCtrl.delete);

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  app.use('/api', router);
}