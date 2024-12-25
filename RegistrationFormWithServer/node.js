const express = require('express');
const path = require('path');
const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname)));
app.use(express.json());

const sql = require('mssql');
const config = {
  user: 'sa',
  password: '123',
  server: 'DESKTOP-TDJOFMS',
  database: 'RegForm',
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

let pool;
async function connectToDatabase() {
  try {
    pool = await sql.connect(config);
    console.log('Подключение к SQL Server успешно установлено');
  }
  catch (err) {
    console.error('Ошибка подключения к SQL Server:', err);
  }
}
connectToDatabase();

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const dublicateEmail = await pool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT * FROM UserAccount WHERE Email = @email');

  if (dublicateEmail.recordset.length > 0) {
    return res.status(400).send({ message: 'Email уже зарегистрирован' });
  }

  const inserUser = await pool.request()
    .input('name', sql.NVarChar, name)
    .input('email', sql.NVarChar, email)
    .input('password', sql.NVarChar, password)
    .query('INSERT INTO UserAccount (Name, Email, Password) VALUES (@name, @email, @password)');
  res.send({ message: 'Пользователь добавлен успешно' });

});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.request()
    .input('email', sql.NVarChar, email)
    .input('password', sql.NVarChar, password)
    .query('SELECT * FROM UserAccount WHERE Email = @email AND Password = @password');

  if (user.recordset.length > 0) {
    res.send({ message: 'Вход выполнен успешно' });
  }
  else {
    res.status(401).send({ message: 'Неверный email или пароль' });
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Сервер запущен по адресу: http://localhost:${port}/`);
});