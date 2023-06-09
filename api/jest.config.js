module.exports = {
    testMatch: ["**/api/jest-tests/*spec.ts"],
    preset: "ts-jest",
    testEnvironment: 'node',
    reporters: [
        "default", [
            "jest-html-reporter", {
                "outputPath": "api/assets/api-tests-report.html",
                "pageTitle": "Unit Tests",
                "includeFailureMsg": true
            }
        ],
    ],
};