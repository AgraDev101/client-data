const express = require("express");
const cors = require("cors")


const app = express();


const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(require("./routes"));

app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`))