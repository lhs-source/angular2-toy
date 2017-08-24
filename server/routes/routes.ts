import * as express from 'express';

import CalendarEventCtrl from '../controllers/calendar-events';
import CalendarEvent from '../models/calendar-events';

import CatCtrl from '../controllers/cat';
import Cat from '../models/cat';

import UserCtrl from '../controllers/user';
import User from '../models/user';

import ChatCtrl from '../controllers/chat';
import Chat from '../models/chat';

import ThreadCtrl from '../controllers/Thread';
import Thread from '../models/Thread';

import CommentCtrl from '../controllers/Comment';
import Comment from '../models/Comment';

export default function setRoutes(app){
    const router = express.Router();

    const eventCtrl = new CalendarEventCtrl();
  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const chatCtrl = new ChatCtrl();
  const threadCtrl = new ThreadCtrl();
  const commentCtrl = new CommentCtrl();

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

  // Chats
  router.route('/chats').get(chatCtrl.getAll);
  router.route('/chats/count').get(chatCtrl.count);
  router.route('/chat').post(chatCtrl.insert);
  router.route('/chat/:id').get(chatCtrl.get);
  router.route('/chat/:id').put(chatCtrl.update);
  router.route('/chat/:id').delete(chatCtrl.delete);

  // Threads
  router.route('/threads').get(threadCtrl.getAllSortd);
  router.route('/threads/count').get(threadCtrl.count);
  router.route('/thread').post(threadCtrl.insert);
  router.route('/thread/:id').get(threadCtrl.get);
  router.route('/thread/:id').put(threadCtrl.update);
  router.route('/thread/:id').delete(threadCtrl.delete);

  router.route('/comments/:id').get(commentCtrl.getAllSortd);
  router.route('/comments/count').get(commentCtrl.count);
  router.route('/comment').post(commentCtrl.insert);
  router.route('/comment/:id').get(commentCtrl.get);
  router.route('/comment/:id').put(commentCtrl.update);
  router.route('/comment/:id').delete(commentCtrl.delete);

  app.use('/api', router);
}