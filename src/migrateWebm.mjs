//const awsconfig = require( './aws-export.js');
import { Amplify } from 'aws-amplify';
import { getUrl } from 'aws-amplify/storage';

import { generateClient } from "aws-amplify/api";
import queries from "./graphql/queries.js";

//Amplify.configure(awsconfig);
const client = generateClient()



