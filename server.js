require('dotenv').config();
const app = require('./app');
const port = process.env.EXPRESS_PORT;

app.listen(port, () => {
  console.log(`${port} 포트에서 서버가 정상적으로 가동되었습니다.`);
})