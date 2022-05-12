const cUsers = require("../controllers/users")

module.exports = function(app) {
    app.post("/users/create", cUsers.create);
    app.get("/users/single", cUsers.single);
}