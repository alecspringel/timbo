// Callback function for ddb.createTable
const createTableCallback = (tableName, err, data) => {
  if (err?.code === 'ResourceInUseException') {
    // eslint-disable-next-line no-console
    console.log(`Timbo found an existing DynamoDB table: ${tableName}`);
  } else if (!err && data) {
    // eslint-disable-next-line no-console
    console.log(`Timbo created a new DynamoDB table: ${tableName}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Timbo encountered an error creating DynamoDB table:\n${err}`);
  }
};

// Sets datatype for strings and numbers and converts null/undefined to strings
const setDimenionsType = (dimensions) => {
  Object.keys(dimensions).forEach((key) => {
    /* eslint-disable no-param-reassign */
    if (dimensions[key] === undefined) dimensions[key] = 'undefined';
    else if (dimensions[key] === null) dimensions[key] = 'null';
    switch (typeof dimensions[key]) {
      case 'string':
        dimensions[key] = { S: dimensions[key] };
        return;
      case 'number':
        dimensions[key] = { N: dimensions[key].toString() };
        return;
      default:
        throw Error(`Timbo error: dimension ${key}: ${dimensions[key]} is of type ${typeof dimensions[key]}. Dimensions must be type string or number.`);
    }
    /* eslint-enable no-param-reassign */
  });
  return dimensions;
};

module.exports = {
  setDimenionsType,
  createTableCallback,
};
