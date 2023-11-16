module.exports = {
    testMatch: ["**/src/api/tests/*.spec.ts"],
    preset: "ts-jest",
    testEnvironment: 'node',
    globalSetup: '../../env/globalSetup.ts',
    testTimeout: 60000,
    maxWorkers: 1,
    reporters: [
        "default",
        ["jest-html-reporters", {
            "publicPath": `assets/api-report-${process.env.test_env || 'tms-main-test'}`,
            "filename": `api-report-${process.env.test_env || 'tms-main-test'}.html`,
            "openReport": true,
            "pageTitle": `API Report: ${process.env.test_env || 'tms-main-test'}`,
            "darkTheme": true,
            "hideIcon": true,
            "logoImgPath": './src/api/img/logo.png'
        }]
    ]
};
