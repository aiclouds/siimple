# Binaries paths
node_modules=../node_modules
node_bin=../node_modules/.bin

# Build the website
.PHONY: build
build:
	rm -rf ./www
	mkdir -p ./www ./www/assets ./www/docs
	@# Build website pages
	node ./scripts/build.js
	@# Build assets
	${node_bin}/sass --no-source-map -I ../packages ./style.scss ./www/assets/style.css
	cp ../packages/siimple/dist/siimple.min.css ./www/assets/
	cp ../packages/siimple-experiments/dist/siimple-experiments.min.css ./www/assets/
	cp ../packages/siimple-icons/dist/siimple-icons.min.css ./www/assets/
	cp -R ../packages/siimple-icons/dist/fonts ./www/assets/
	@# Add vendor assets
	mkdir -p ./www/assets/vendors
	cp ${node_modules}/react/umd/react.production.min.js ./www/assets/vendors/
	cp ${node_modules}/react-dom/umd/react-dom.production.min.js ./www/assets/vendors/
	@# Copy images 
	#mkdir -p ./www/assets/brand && cp -R ../art/brand/. ./www/assets/brand/
	#mkdir -p ./www/assets/icons && cp -R ../art/icons/. ./www/assets/icons/
	@# Build scripts
	${node_bin}/webpack --config webpack.config.js

# Serve the site
.PHONY: test
test:
	${node_bin}/stattic --port 5000 --folder ./www --cors

# Publish the website
.PHONY: publish
publish: 
	#make build
	#gsutil rsync -d -r ./_site gs://siimple-documentation.appspot.com/www

