module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
        jest: true,
    mocha: true
    },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier/@typescript-eslint",
    "prettier/react",
    ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
      "__DEV__": true,
    "React": false
    },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
        },
    project: "./tsconfig.json",
    sourceType: "module"
    },
  plugins: [
    "@typescript-eslint",
    "import",
    "prettier",
    "react",
    ],
  root: true,
    rules: {
    "react/jsx-filename-extension": [1, { "allow": "as-needed" }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "newline-before-return": "error",
    "no-console": "off",
    "no-continue": "off",
    "require-yield": "error",
    "spaced-comment": [
      "error",
      "always",
            {
        markers: ["/"
                ],
            },
        ],
    "no-use-before-define": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-var-requires": "off",
    "react/jsx-filename-extension": [
      "error",
            {
        extensions: ["jsx", "tsx"
                ]
            }
        ],
    "react/jsx-props-no-spreading": [
      "warn",
            {
        custom: "ignore",
            },
        ],
    "react/prop-types": "off",
    "react/require-default-props": ["off", { forbidDefaultForRequired: false, ignoreFunctionalComponents: false }],
    "react/no-unused-prop-types": ["off", {}],
    "react/default-props-match-prop-types": ["off", { "allowRequiredDefaults": false }],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "import/extensions": [
      "error",
      "always",
            {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
            }
        ],
    },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"
            ],
        },
    "import/resolver": {
      node: {
        extensions: [".js", "jsx", ".ts", ".tsx"
                ],
        paths: ["src"
                ],
            }
        },
    react: {
      version: "detect"
        }
    },
};
