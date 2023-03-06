import express from 'express'
import cors from 'cors'
import routes from './api/routes.js'
import dotenv from 'dotenv'
import db from './database.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);  // configure API access point
app.use('/api', (req, res) => res.status(200).json({status: 'success'}));  // health check
app.use('*', (req, res) => res.status(404).json({error: '404'}));  // for undefined routes

dotenv.config({ path: '../.env' })
await db.create()  // create the database instance

// Start the app on port
const port = process.env.PORT || 5100;
app.listen(port, () => {
    console.log(`listening on port ${port}`);

});

export default app