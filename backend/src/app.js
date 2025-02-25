const express = require("express");
const bodyParser = require("body-parser");
const migration = require("./models/migration");
const routes = require("./routes/routes");  // Import routes
const cors = require("cors");

const app = express();
const port = 3000;

migration(); // Run migrations if needed

app.use(cors());
app.use(bodyParser.json());

// Use the routes from the `routes/routes.js` file
app.use('/api', routes);

app.listen(port, () => {
    console.log("=============================================");
    console.log(`Server is running on http://localhost:${port}`);
    console.log("=============================================");
});
