const { v1: uuidV1 } = require('uuid');
const { lic: LicModel, sequelize } = require('../models');
const Helper = require('../utils/helper');

const save = async (data) => {
  try {
    const { policyNumber, userId } = data;

    const existingLic = await LicModel.findOne({ where: { policy_number: policyNumber } });

    if (existingLic) {
      return { errors: [ { name: 'LIC', message: 'Policy Number  already exists!' } ] };
    }

    const publicId = uuidV1();

    const licDoc = Helper.convertCamelToSnake({
      ...data, publicId, userId, created_by: userId,
    });

    await LicModel.create(licDoc);

    return { doc: { publicId, message: 'successfully saved.' } };
  } catch (error) {
    return { err: error.message };
  }
};

const getAll = async (payload) => {
  const { userId } = payload;

  const response = await LicModel.findAll({
    attributes: { exclude: [ 'id' ] },
    where: { user_id: userId },
  });

  if (response) {
    const doc = response.map((element) => Helper.convertSnakeToCamel(element.dataValues));

    return { count: doc.length, doc };
  }

  return { count: 0, doc: [] };
};

const getDetailById = async (payload) => {
  const { publicId } = payload;

  const response = await LicModel.findOne({
    attributes: { exclude: [ 'id' ] },
    where: { public_id: publicId },
  });

  if (response) {
    return { doc: Helper.convertSnakeToCamel(response.dataValues) };
  }

  return { };
};

const patch = async (payload) => {
  const { publicId, ...newDoc } = payload;

  const transaction = await sequelize.transaction();

  try {
    const response = await LicModel.findOne({
      where: { public_id: publicId },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (response) {
      const doc = Helper.convertCamelToSnake(newDoc);

      await LicModel.update(doc, { where: { public_id: publicId }, transaction });

      await transaction.commit();

      return { doc: { message: 'successfully updated.', publicId } };
    }
    await transaction.rollback();

    return { errors: [ { name: 'LIC', message: 'no record found.' } ] };
  } catch (error) {
    await transaction.rollback();

    throw error;
  }
};

module.exports = {
  save, getAll, getDetailById, patch,
};
