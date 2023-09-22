module.exports = {
    testMatch: ["**/src/api/tests/groups.spec.ts"],
    preset: "ts-jest",
    testEnvironment: 'node',
    globalSetup: '../../env/globalSetup.ts',
    testTimeout: 30000,
    reporters: [
        "default", [
            "jest-html-reporter", {
                "outputPath": `assets/api-reports/api-tests-report-${process.env.test_env || 'test-main-test'}.html`,
                "pageTitle": "API Tests",
                "includeFailureMsg": true
            }
        ],
    ],
};