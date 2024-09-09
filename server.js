import express from 'express';
import { router } from './Routes/userRoutes';
import { database } from './Model/index.js';
import { verifyToken } from './middleware/verifyToken.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

database.sequelize.sync().then(() => {
    console.log('user Model synced');
});


app.use('/api/users', router);
app.get('/', verifyToken, (req, res) => {
    res.status(200).send({message: 'jwt verified'});
})

app.listen(port, () => {
    console.log('listening on port : ', port);
});


