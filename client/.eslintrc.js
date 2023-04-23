// Documentation of this configuration is in src/documentation/infrastructure/codeStyle.story.mdx. Keep in sync.
module.exports = {
    root: true,
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            extends: ["airbnb", "airbnb-typescript", "airbnb/hooks", "plugin:react/jsx-runtime", "plugin:prettier/recommended"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: "./tsconfig.json",
            },
            plugins: ["simple-import-sort"],
            rules: {
                "sort-imports": "off",
                "import/order": "off",
                "simple-import-sort/imports": [
                    "error",
                    {
                        /* Regular expressions for grouping and ordering of imports. New line is added in between groups. */
                        groups: [
                            [
                                "^\\u0000", // Imports of side effects, like polyfills
                            ],
                            [
                                "^[@\\w]", // Starts with word characters or @, matches libs from node modules
                            ],
                            [
                                "^src/*", // Absolute imports from our app
                                "^\\.\\./", // Relative imports from parent module
                                "^\\./", // Relative imports within module
                            ],
                        ],
                    },
                ],
                "simple-import-sort/exports": "error",
                "import/prefer-default-export": "off",
                "@typescript-eslint/no-unused-vars": [
                    "error",
                    {
                        vars: "all", // Check use of all variables, global included. (default setting)
                        args: "all", // Check use of all parameters.
                        argsIgnorePattern: "^_", //Unused parameters can start by "_"
                    },
                ],
                // we prefer top-down approach, mainly for styled-components
                "@typescript-eslint/no-use-before-define": "off",
                "@typescript-eslint/no-explicit-any": "error",
                "no-param-reassign": [
                    "error",
                    {
                        props: true,
                        ignorePropertyModificationsForRegex: ["^draft", "^accumulator"],
                    },
                ],
                "func-names": ["error", "as-needed"],
                "import/no-extraneous-dependencies": ["error"],
                "react/jsx-props-no-spreading": "off",
                "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
                "react/function-component-definition": [
                    "error",
                    {
                        namedComponents: "arrow-function",
                        unnamedComponents: "arrow-function",
                    },
                ],
                "@typescript-eslint/default-param-last": "off",
                "jsx-a11y/label-has-associated-control": [
                    2,
                    {
                        assert: "either", // either check for `htmlFor` or `nesting`, see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md
                    },
                ],
            },
        },
        {
            files: ["*.yml", "*.yaml"],
            extends: ["plugin:yml/recommended"],
            parser: "yaml-eslint-parser",
            rules: {
                "yml/sort-keys": "error",
            },
        },
    ],
};
