import model from '../models';

const { Request } = model;

export default {
  createRequest(request, response) {
    const { userId, bookId } = request.body;
    return Request.create({
      userId,
      message: 'the following user wishes to upgrade to the next level',
      type: 'upgrade'
    })
      .then(createdRequest => response.status(201).send(createdRequest))
      .catch(error => response.status(500).send({
        message: error.message
      }));
  },
  getRequests(request, response) {
    return Request
      .findAll({
        where: {
          isTreated: false
        }
      })
      .then(requests => response.status(200).send(requests))
      .catch(error => response.status(500).send({ error: error.message }));
  },
  updateRequests(userId) {
    return Request.findAll({
      where: {
        isTreated: false,
        userId,
      }
    }).then(requests => requests.map(request =>
      request.update({
        isTreated: true
      })))
      .catch(() => ({ message: 'Something went wrong' }));
  }
};
