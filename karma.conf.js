// Documentation at 
// http://karma-runner.github.io/2.0/config/configuration-file.html
// https://github.com/monounity/karma-typescript/blob/master/cookbook.md
module.exports = function(config) {
    config.set({
        autoWatch: true,
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts" }, // *.tsx for React Jsx
            { pattern: "test/**/*.ts" }
        ],

        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.test.json"
        },

        preprocessors: {
            "src/**/*.ts": ["karma-typescript", "coverage"], // *.tsx for React Jsx
            "test/**/*.ts": ["karma-typescript"]
        },
        reporters: ["progress", "coverage", "karma-typescript"],
        browsers: ["Chrome"]
    });
};