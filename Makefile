install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

lint:
	npx eslint . --fix

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	npm test