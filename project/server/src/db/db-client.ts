import { Connection, createConnection } from 'typeorm';
import User from '../entities/User';
import { CutVote } from '../entities/CutVote';

export const createDB = async (): Promise<Connection> =>
   createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    database: 'ghibli_graphql',
    password:'qwer1234',
    logging: !(process.env.MODE_ENV === 'production'),
    synchronize:true,
    entities: [User, CutVote],
   })