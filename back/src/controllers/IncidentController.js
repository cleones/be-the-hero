const connection = require('../database/connectiom');
const defautLimit = 5;
const index = async (request, response) => {
  const { page = 1 } = request.query;

  const [count] = await connection('incidents').count();

  const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(defautLimit)
    .offset((page - 1) * defautLimit)
    .select([
      'incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf '
    ]);
  response.header('X-Total-Count', count['count(*)']);
  return response.json(incidents);
};
const store = async (request, response) => {
  const { title, description, value } = request.body;
  const ong_id = request.headers.authorization;

  const [id] = await connection('incidents').insert({
    title,
    description,
    value,
    ong_id
  });
  return response.json({ id });
};
const remove = async (request, response) => {
  const { id } = request.params;
  const ong_id = request.headers.authorization;

  const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();

  if (incident.ong_id !== ong_id) {
    return response.status(401).json({
      error: 'Operation not permitted'
    });
  }
  await connection('incidents')
    .where('id', id)
    .delete();

  return response.status(204).send();
};

module.exports = {
  index,
  store,
  remove
};
