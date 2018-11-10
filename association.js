const sequelize = require("./db");

var User = sequelize.import("./models/User");
var Item = sequelize.import("./models/Item");
var Comment = sequelize.import("./models/Comment");

User.hasMany(Item);
Item.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);

sequelize.sync();

// sequelize.sync({ force: true })
