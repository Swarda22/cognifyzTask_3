console.log("Start");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
express.json
const port = 9000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const formData = req.body;
  console.log(formData);
  const reg_pass = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#\-]).{4,8}$/;
  if (!reg_pass.test(formData.password)) {
    return res.render('error', { message: "Password format is incorrect. It must contain at least one digit, one uppercase letter, one lowercase letter, one special character (@, #, or -), and be 4 to 8 characters long." });
  } else {
    return res.render('success', { formData });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});





































