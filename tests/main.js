import assert from "assert";
import '/tests/imports/api/tasksMethods.tests.js'
import '/tests/imports/api/tasksPublications.tests.js'
import '/tests/imports/api/eventsMethods.tests.js'
import '/tests/imports/api/eventsPublications.tests.js'
import '/tests/imports/ui/util/commonUtils.tests.js'

describe("dibujo", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "dibujo");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
