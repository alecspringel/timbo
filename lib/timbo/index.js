const AWS = require('aws-sdk');
const configTable = require('./utils/configTable');
const { setDimenionsType, createTableCallback } = require('./utils/dynamo');

class Timbo {
  constructor(accessKeyId, secretAccessKey, region, tableName) {
    // Configure AWS
    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey,
    });

    this.tableName = tableName;
    this.ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

    // Create DDB Table
    this.ddb.createTable(configTable.metrics(tableName),
      (err, data) => createTableCallback(tableName, err, data));
  }

  recordMetric(appName, metricName, dimensions, createdDate = new Date().getTime().toString()) {
    const formattedDimensions = setDimenionsType(dimensions);
    const params = {
      TableName: this.tableName,
      Item: {
        metricName: { S: `${appName}#${metricName}` },
        createdDate: { N: createdDate },
        ...formattedDimensions,
      },
    };
    this.ddb.putItem(params, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('Timbo error recording metric:\n', err);
      } else {
        // eslint-disable-next-line no-console
        console.log('Timbo successfully recorded metric.');
      }
    });
  }
}

module.exports = Timbo;
