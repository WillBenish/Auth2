
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIATINNUJ5XGYFNMLVS',
  secretAccessKey: '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',
  region: 'us-east-2',
});



const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'Books',
};

docClient.scan(params, (err, data) => {
  if (err) {
    console.error('Unable to scan the table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Scan succeeded.');
    data.Items.forEach(item => {
      console.log('Item:', JSON.stringify(item, null, 2));
    });
  }
});


/*

const runScript = async () =>{
    const allBooks = await client.graphql({
        query: listBooks,
        variables:{filter: filterBookObject}
    });
    
    console.log(allBooks)
}

runScript()

*/
/*
aws_access_key_id=AKIATINNUJ5XGYFNMLVS
aws_secret_access_key=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
*/

