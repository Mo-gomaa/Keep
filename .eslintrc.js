module.exports = {
        env: {
                browser: true,
                es2021: true,
        },
        extends: "eslint:recommended",
        overrides: [
                {
                        env: {
                                node: true,
                        },
                        files: [".eslintrc.{js,cjs}"],
                        parserOptions: {
                                sourceType: "script",
                        },
                },
        ],
        parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
        },
        rules: {
                indent: ["error", 8],
                "linebreak-style": ["error", "unix"],
                quotes: ["error", "double"],
                semi: ["error", "always"],
        },
};
/* settings.json during the installation:


{
  "editor.formatOnSave": true,
  "editor.tabSize": 8,
  "workbench.colorTheme": "Monokai",
  "better-comments.multilineComments": true,
  "better-comments.highlightPlainText": false,
  "better-comments.tags": [
    {
      "tag": "!",
      "color": "#FF2D00",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "?",
      "color": "#3498DB",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "//",
      "color": "#474747",
      "strikethrough": true,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "todo",
      "color": "#FF8C00",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "*",
      "color": "#98C379",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    }
  ],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "animations.Install-Method": "Apc Customize UI++",
  "apc.imports": [
    "file:///home/mohamd-g/.vscode/extensions/brandonkirbyson.vscode-animations-2.0.1/dist/updateHandler.js"
  ],
  "eslint.options": {
    "indent": ["error", 8]
  },
  "prettier.tabWidth": 8
}


*/
