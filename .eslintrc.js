module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
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
    "__DEV__": true
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
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
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
