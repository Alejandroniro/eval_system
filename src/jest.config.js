// jest.config.js
export default {
    testEnvironment: "node",
    transform: {
      "^.+\\.js$": "babel-jest",
    },
    extensionsToTreatAsEsm: [".js"],
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
    },
  };
  