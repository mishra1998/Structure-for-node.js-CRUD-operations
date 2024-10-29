/* eslint-disable filenames/match-regex */
module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('lic', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    public_id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    policy_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    policy_holder_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_commence: { type: DataTypes.DATE },
    premium_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    date_of_maturity: { type: DataTypes.DATE },
    sum_assuraed: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    bonus_assuraed: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    frequency: { type: DataTypes.STRING },
    next_due_date: { type: DataTypes.DATE },
    amount_on_maturity: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    created_by: { type: DataTypes.UUID },
    updated_by: { type: DataTypes.UUID },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('lic'),
};
