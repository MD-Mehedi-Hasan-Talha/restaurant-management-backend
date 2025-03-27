const { gql } = require("graphql-tag");

const Settings = gql`
  type Settings {
    id: ID!
    restaurantId: ID!
    orderConfirm: Boolean!
    orderStatusChange: Boolean!
    orderDelivered: Boolean!
    emailNotification: Boolean!
    smsNotification: Boolean!
    pushNotification: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input SettingsInput {
    restaurantId: ID!
    orderConfirm: Boolean
    orderStatusChange: Boolean
    orderDelivered: Boolean
    emailNotification: Boolean
    smsNotification: Boolean
    pushNotification: Boolean
  }

  input SettingsUpdateInput {
    orderConfirm: Boolean
    orderStatusChange: Boolean
    orderDelivered: Boolean
    emailNotification: Boolean
    smsNotification: Boolean
    pushNotification: Boolean
  }
`;

module.exports = Settings;