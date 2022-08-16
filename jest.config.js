module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 200000,
  setupFilesAfterEnv: [],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
    },
  },
};