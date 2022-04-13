const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5001;

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());
// middlewares
app.use(express.json({ extended: false }));
app.use(cors());
// route included
app.use("/payment", require("./payment/payment"));

app.listen(port, () => console.log(`server started on port ${port}`));