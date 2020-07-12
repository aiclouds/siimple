# Binaries paths
node_bin=../node_modules/.bin

# Build the website
.PHONY: build
build:
	rm -rf ./www
	mkdir -p ./www ./www/assets ./www/docs
	@# Build website pages
	node ./scripts/build.js
	@# Build assets
	${node_bin}/sass --no-source-map -I ../node_modules ./styles/index.scss ./www/assets/style.css
	cp ../packages/siimple/dist/siimple.min.css ./www/assets/
	cp ../packages/siimple-icons/dist/siimple-icons.min.css ./www/assets/
	cp -R ../packages/siimple-icons/dist/fonts ./www/assets/
	@# Copy images 
	mkdir -p ./www/assets/brand && cp -R ../art/brand/. ./www/assets/brand/
	mkdir -p ./www/assets/icons && cp -R ../art/icons/. ./www/assets/icons/

# Serve the site
.PHONY: test
test:
	${node_bin}/stattic --port 5000 --folder ./www --cors

# Publish the website
.PHONY: publish
publish: 
	#make build
	#gsutil rsync -d -r ./_site gs://siimple-documentation.appspot.com/www

