const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
    console.log("Iniciando Servidor. Puerto 3000 ");
});

app.get("/", function(Req, res){
    res.send('<H1>Bienvenido a notas de recordatorio vía SMTP - MEAN</H1>')
});
