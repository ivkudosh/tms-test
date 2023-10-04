module.exports = {
    testMatch: ["**/src/api/tests/*.spec.ts"],
    preset: "ts-jest",
    testEnvironment: 'node',
    globalSetup: '../../env/globalSetup.ts',
    testTimeout: 60000,
    reporters: [
        "default", [
            "jest-html-reporter", {
                "outputPath": `assets/api-reports/api-report-${process.env.test_env || 'tms-main-test'}.html`,
                "pageTitle": "API Tests",
                "includeFailureMsg": true
            }
        ],
    ],
};