install:
	npm ci
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npx jest --coverage
say-hello:
	echo "Hello, world!"