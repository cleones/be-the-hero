const generateUniqueId = require('../util/generateUniqueId');
const connection = require('../database/connectiom');

const index = async (request, response) => {
  const ongs = await connection('ongs').select('*');
  return response.json(ongs);
};
const store = async (request, response) => {
  const { name, email, whatsapp, city, uf } = request.body;
  const id = generateUniqueId();
  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  });
  return response.json({ id });
};

module.exports = {
  index,
  store
};
