module.exports = {
    testMatch: ["**/unit/jest-tests/*spec.ts"],
    preset: "ts-jest",
    testEnvironment: 'node',
    reporters: [
        "default", [
            "jest-html-reporter", {
                "outputPath": "unit/assets/unit-tests-report.html",
                "pageTitle": "Unit Tests",
                "includeFailureMsg": true
            }
        ],
    ],
};
