const { ObjectID } = require('mongodb');
const { Merman } = require('../db/merman');

module.exports = (app) => {

  app.get('/srv/all', async (request, response) => {
    try {
      const mermen = await Merman.find();
      response.send({mermen});
    } catch (error) {
      response.status(400).send(error);
    }
  });

  app.post('/srv/new', async (request, response) => {
    const merman = new Merman({
      name: request.body.name,
      location: request.body.location,
    });
    try {
      const doc = await merman.save();
      response.send(doc);
    } catch (error) {
      response.status(400).send(error);
    };
  });
  
  app.patch('/srv/change/:my_id', async (request, response) => {
    const id = request.params.my_id;
    let body = _.pick(request.body, ['name', 'location']);
  
    if (!ObjectID.isValid(id)) {
      response.status(404).send({error: `ID ${id} is not valid!`});
    } else {
      try {
        console.log(body);
        const doc = await Merman.findOneAndUpdate(
          {_id: id},
          {$set: body},
          {new: true});
          if(!doc) {
            response.status(404).send({error: `ID ${id} cannot be located!`});
          } else {
            response.status(200).send({doc});
          }
      } catch(error) {
        response.status(400).send({error: `connect update Mongo DB for ID ${id}`});
      };
    }
  });
  
  app.delete('/srv/del/:my_id', async (request, response) => {
    const id = request.params.my_id;
  
    if(!ObjectID.isValid(id)) {
      response.status(404).send({error: `ID ${id} not valid!`});
    } else {
      try {
        const doc = await Merman.findOneAndRemove({
          _id: id});
        if (doc) {
          response.status(200).send({doc});
        } else {
          response.status(404).send({error: `fail to locate ID ${id}`});
        }
      } catch (error) {
        response.status(400).send({
          error: 'Cannot connect to Mongo DB'
        });
      };
    } 
  });

};