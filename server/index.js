const express = require('express')
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser')

app.use(cors());
app.use(express.json());

app.use( express.json({limit: '14kb'}))
app.use(bodyparser());

app.use(express.urlencoded({ extended: true}));
app.use(cookieparser());


const adminRoute = require('./routes/adminRoute.js');
const usersRoutes = require('./routes/usersRoutes');
const syncMediaRoutes = require('./routes/syncMediaRoutes');
const mediaRouter = require('./routes/mediaRoutes');
const permissionRoute = require('./routes/permissionRoute');
const staffRoute = require('./routes/staffRoute');


app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/syncMedia', syncMediaRoutes);
app.use('/api/v1/media', mediaRouter);
app.use('/api/v1/permission', permissionRoute);
app.use('/api/v1/staff', staffRoute);





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