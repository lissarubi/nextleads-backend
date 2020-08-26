const connection = require('../database/connection');
const crypto = require('crypto');
const aes = require('../utils/aes');
require('dotenv').config();

module.exports = {
  async index(request, response) {
    const loginId = request.headers.authorization;
    const [count] = await connection('leads').count();
    const leads = await connection('leads')
      .where('loginid', loginId)
      .select('*')
      .orderBy('id', 'desc');
    response.header('X-Total-Count', count['count(*)'] - 1);
    const decryptedLeads = Array();
    for (i = 0; i < leads.length; i++) {
      decryptedLeads.push({
        id: leads[i].id,
        name: aes.decrypt(
          leads[i].name,
          Buffer.from(leads[i].id, 'hex'),
          Buffer.from(process.env.IV, 'hex'),
        ),
        email: aes.decrypt(
          leads[i].email,
          Buffer.from(leads[i].id, 'hex'),
          Buffer.from(process.env.IV, 'hex'),
        ),
        tel: aes.decrypt(
          leads[i].tel,
          Buffer.from(leads[i].id, 'hex'),
          Buffer.from(process.env.IV, 'hex'),
        ),
        contacted: leads[i].contacted,
        interested: leads[i].interested,
        matriculated: leads[i].matriculated,
        date: leads[i].date,
        reminder: leads[i].reminder,
        loginid: leads[i].loginid,
      });
    }

    return response.json(decryptedLeads);
  },

  async create(request, response) {
    const {
      name,
      email,
      tel,
      contacted,
      interested,
      matriculated,
    } = request.body;

    const loginid = request.headers.authorization;

    const id = crypto.randomBytes(32).toString('HEX');
    const date = new Date().toISOString().slice(0, 10);

    const encryptedName = aes.encrypt(
      name,
      Buffer.from(id, 'hex'),
      Buffer.from(process.env.IV, 'hex'),
    );

    const encryptedEmail = aes.encrypt(
      email,
      Buffer.from(id, 'hex'),
      Buffer.from(process.env.IV, 'hex'),
    );
    const encryptedTel = aes.encrypt(
      tel,
      Buffer.from(id, 'hex'),
      Buffer.from(process.env.IV, 'hex'),
    );
    await connection('leads').insert({
      id,
      name: encryptedName,
      email: encryptedEmail,
      tel: encryptedTel,
      contacted,
      interested,
      matriculated,
      date,
      reminder: 0,
      loginid,
    });

    return response.json();
  },

  async delete(request, response) {
    const { id } = request.params;
    const loginId = request.headers.authorization;
    const lead = await connection('leads').where('id', id).first();

    if (lead.loginid != loginId) {
      return response.status(401).json({ error: 'Operation not permited' });
    }

    await connection('deleted_leads').insert({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      tel: lead.tel,
      contacted: lead.contacted,
      interested: lead.interested,
      matriculated: lead.matriculated,
      date: lead.date,
      reminder: lead.reminder,
      loginid: lead.loginId,
    });

    await connection('leads').where('id', id).delete();

    return response.status(204).send();
  },
};
