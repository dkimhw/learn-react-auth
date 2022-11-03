
import express from 'express'
import createUser from 'routes/create_user.js'


const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/', createUser);

const PORT = 5052;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
