const app = require("./app");
const mongoose = require("mongoose");
mongoose
    .connect(
        `mongodb+srv://mahragamongo:123Mahraga@mahraga.2t04076.mongodb.net/mahraga`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then((con) => {
        console.log("Database Connected!");
    })
    .catch((err) => {
        console.log(err);
    });
app.listen(8888, () => {
    console.log("listening on port 8888 .......");
});
