import model from '../models';

const { Request } = model;

export default {
  createRequest(request, response) {
    const { userId, message, bookId } = request.body;
    if ((message.trim()).length < 10) {
      return response.status(400).send({
        message: 'Message is too short'
      })
    }
    Request.create({
      userId,
      message,
      bookId,
      type: 'upgrade'
    })
      .then(createdRequest => response.status(201).send(createdRequest))
      .catch(error => response.status(500).send({
        message: error.message
      }));
  },
  getRequests(request, response) {
    return Request
      .findAll({})
      .then(requests => response.status(200).send(requests))
      .catch(error => response.status(500).send({ error: error.message }));
  }
};
