module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/recommended' /*, 'plugin:@typescript-eslint/recommended-requiring-type-checking' */],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	root: true,
	settings: {
		"import/resolver": {
			"node": {
				"extensions": [".js", ".jsx", ".ts", ".tsx"]
			}
		}
	},
	overrides: [
		{
			"files": ['*.ts', '*.tsx'],
			"parserOptions": {
				"project": ['./tsconfig.json']
			}
		}
	],
	rules: {
		// "@typescript-eslint/restrict-template-expressions": "off",
		"import/no-default-export": "error",
		"no-else-return": ["error"],
		"complexity": ["warn", { "max": 23 }],
		"no-var": ["warn"],
		"dot-notation": ["warn"],
		"vars-on-top": ["warn"],
		"prefer-const": ["warn"],
		"camelcase": ["warn"],
		"no-multi-spaces": ["warn"],
		"quotes": ["warn", "single", { "avoidEscape": true }]
	}
};
