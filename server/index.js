const express = require('express')
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser')

app.use(cors());
app.use(express.json());

app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: true}));


const adminRoute = require('./routes/adminRoute.js');

app.use('/api/v1/admin', adminRoute  )




// const auth = require('./route/auth');
// app.use("/auth", auth);

// const odoads_data_manage = require("./route/odoads_data_manage");
// app.use("/odoads_data_manage", odoads_data_manage);

// const media = require("./route/media");
// app.use("/media", media);

// const cart = require("./route/cart");
// app.use("/cart", cart);

// const users = require("./route/users"); 
// app.use("/users", users);
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Your Website Running at ${PORT}`);
})