module.exports = {
    testMatch: ["**/src/api/tests/*.spec.ts"],
    preset: "ts-jest",
    testEnvironment: 'node',
    globalSetup: '../../env/globalSetup.ts',
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