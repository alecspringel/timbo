// Parameters for configuring DynamoDB
const configTable = {
  metrics: (tableName) => ({
    TableName: tableName,
    BillingMode: 'PAY_PER_REQUEST',
    KeySchema: [
      { AttributeName: 'metricName', KeyType: 'HASH' },
      { AttributeName: 'createdDate', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'metricName', AttributeType: 'S' },
      { AttributeName: 'createdDate', AttributeType: 'N' },
    ],
  }),
};

module.exports = configTable;
