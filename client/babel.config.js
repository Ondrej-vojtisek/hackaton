module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                corejs: "3.27",
            },
        ],
        [
            "@babel/preset-react",
            {
                runtime: "automatic",
                development: process.env.NODE_ENV === "development",
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: ["@babel/plugin-transform-runtime"],
};
