const express = require('express');
const app = express();
const apiRoutes = require('./routers/app.routers');

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});