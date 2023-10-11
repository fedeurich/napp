bcryptjs = require("bcryptjs");

const password = "123456";
const hash = bcryptjs.hashSync(password, 10);

console.log(bcryptjs.compareSync(password, hash));
