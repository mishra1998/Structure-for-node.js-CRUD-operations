const {
  save, getDetailById, patch, getAll,
} = require('../controllers/lic');

module.exports = (router) => {
  router.post('/lic', save);
  router.get('/lic', getAll);
  router.get('/lic/:publicId', getDetailById);
  router.patch('/lic/:publicId', patch);
};
