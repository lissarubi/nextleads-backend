const connection = require('../database/connection');

module.exports = {
  async changeItems(request, response) {
    const { leadId, item } = request.body;
    const instId = request.headers.authorization;
    const lead = await connection('leads')
      .where('id', leadId)
      .select('loginid')
      .first();
    if (lead.loginid != instId) {
      return response.status(401).json({ error: 'Operation not permited' });
    }

    if (item == 'contacted') {
      await connection('leads')
        .where('id', '=', leadId)
        .update({ contacted: true });
    }
    if (item == 'interested') {
      await connection('leads')
        .where('id', '=', leadId)
        .update({ interested: true });
    }
    if (item == 'matriculated') {
      await connection('leads')
        .where('id', '=', leadId)
        .update({ matriculated: true });
    }

    if (item == 'reminder') {
      const { reminder } = request.body;
      await connection('leads')
        .where('id', '=', leadId)
        .update({ reminder: reminder });
    }

    return response.status(204).send();
  },
};
