
import express from 'express'
import createUser from './routes/user.js'
import cors from 'cors'
import bodyParser from 'body-parser'


const app = express();
app.use(cors());
// app.use(express.urlencoded({ extended: true })); // Tells Express to parse the post request body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Index page
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Create user routes
app.use('/users', createUser);

// http://localhost:5015/
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
