module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": [
        "vue",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error"
    }
};
