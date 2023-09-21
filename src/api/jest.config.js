module.exports = {
    testMatch: ["**/src/api/tests/manyUsersForSmile.spec.ts"],
    preset: "ts-jest",
    testEnvironment: 'node',
    globalSetup: '../../env/globalSetup.ts',
    testTimeout: 30000,
    reporters: [
        "default", [
            "jest-html-reporter", {
                "outputPath": `src/api/assets/api-tests-report-${process.env.test_env || 'test'}.html`,
                "pageTitle": "API Tests",
                "includeFailureMsg": true
            }
        ],
    ],
};