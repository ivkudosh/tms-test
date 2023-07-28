module.exports = {
    testMatch: ["**/api/tests/jobs.spec.ts"], //["**/api/tests/*spec.ts"], 
    preset: "ts-jest",
    testEnvironment: 'node',
    globalSetup: '../environment/globalSetup.ts',
    reporters: [
        "default", [
            "jest-html-reporter", {
                "outputPath": `api/assets/api-tests-report-${process.env.test_env || 'test'}.html`,
                "pageTitle": "API Tests",
                "includeFailureMsg": true
            }
        ],
    ],
};