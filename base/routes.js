module.exports.setup = function (app, handlers) {
  app.get('/', handlers.app.index);
  app.get(/^(\/app\/.+)$/, handlers.app.files);
  app.get('/rest/user', handlers.user.list);
  app.get('/rest/user/:id', handlers.user.get);
  app.post('/rest/user', handlers.user.create);
  app.put('/rest/user/:id', handlers.user.update);
  app.delete('/rest/user/:id', handlers.user.remove);
};
