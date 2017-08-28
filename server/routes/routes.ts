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

import CategoryCtrl from '../controllers/Category';
import Category from '../models/Category';

export default function setRoutes(app){
    const router = express.Router();

    const eventCtrl = new CalendarEventCtrl();
  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const chatCtrl = new ChatCtrl();
  const threadCtrl = new ThreadCtrl();
  const commentCtrl = new CommentCtrl();
  const categoryCtrl = new CategoryCtrl();

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
  router.route('/threads/:category/:page').get(threadCtrl.getAllSortd);
  router.route('/threadscount/:category').get(threadCtrl.countThread);
  router.route('/thread').post(threadCtrl.insert);
  router.route('/thread/:id').get(threadCtrl.get);
  router.route('/thread/:id').put(threadCtrl.update);
  router.route('/thread/:id').delete(threadCtrl.delete);

  router.route('/thread/:tid/comments/:cid').get(threadCtrl.getAllComment);
  router.route('/thread/:tid/comments/count').get(threadCtrl.countComment);
  router.route('/thread/:tid/comment').put(threadCtrl.insertComment);
  router.route('/thread/:tid/comment/:cid').get(threadCtrl.getComment);
  router.route('/thread/:tid/comment/:cid').put(threadCtrl.updateComment);
  router.route('/thread/:tid/comment/:cid').delete(threadCtrl.deleteComment);

  router.route('/categories').get(categoryCtrl.getAll);
  router.route('/categories/count').get(categoryCtrl.count);
  router.route('/category').post(categoryCtrl.insert);
  router.route('/category/:id').get(categoryCtrl.get);
  router.route('/category/:id').put(categoryCtrl.update);
  router.route('/category/:id').delete(categoryCtrl.delete);

  app.use('/api', router);
}