module.exports = function() {
  var faker = require("faker");
  var _ = require("lodash");
  return {
    people: _.times(10, function(n) {
      return {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        designation: faker.name.jobArea()
      };
    })
  };
};
