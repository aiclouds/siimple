node_bin=./node_modules/.bin
pkgs_folder=./packages
website_folder=./website

## Output paths
output_dist=./packages/siimple/dist
output_dist_icons=./packages/siimple-icons/dist
output_svg=${output_dist_icons}/svg
output_svg_icons=${output_svg}/siimple-icons.svg
output_fonts=${output_dist_icons}/fonts
output_fonts_icons_svg=${output_fonts}/siimple-icons.font.svg
output_fonts_icons_ttf=${output_fonts}/siimple-icons.font.ttf
output_fonts_icons_woff=${output_fonts}/siimple-icons.font.woff
output_fonts_icons_woff2=${output_fonts}/siimple-icons.font.woff2

# Initialize the env
.PHONY: install
install:
	npm install
	rm package-lock.json

# Upgrade packages versions
.PHONY: upgrade
upgrade:
	node ./scripts/upgrade.js

# Run sass-lint
.PHONY: lint
lint: 
	${node_bin}/sass-lint -v

# Clean output bundles and dist folders
.PHONY: clean
clean:
	cd packages/neutrine/ && rm -rf dist
	cd packages/siimple/ && rm -rf dist scss
	cd packages/siimple-icons/ && rm -rf dist
	#cd scss/ && rm _icons.scss

# Build siimple
.PHONY: build
build: 
	mkdir -p ${output_dist} ${output_dist_icons} ${output_fonts} ${output_svg}
	### Compile icons
	node ./scripts/compile.js
	### Generate icons SVG sprites
	node ./scripts/build-svg-sprites.js --output ${output_svg_icons}
	### Generate icons fonts
	node ./scripts/build-svg-font.js --output ${output_fonts_icons_svg}
	${node_bin}/svg2ttf ${output_fonts_icons_svg} ${output_fonts_icons_ttf}
	${node_bin}/ttf2woff ${output_fonts_icons_ttf} ${output_fonts_icons_woff}
	${node_bin}/woff2_compress.js ${output_fonts_icons_ttf} ${output_fonts_icons_woff2}
	### Generate icons styles
	${MAKE} build-style input="./scss/icons/index.scss" output="${output_dist_icons}/siimple-icons"
	### Generate css bundles
	${MAKE} build-module bundle="elements/index.scss" output="siimple-elements"
	${MAKE} build-module bundle="experiments/index.scss" output="siimple-experiments"
	${MAKE} build-module bundle="form/index.scss" output="siimple-form"
	${MAKE} build-module bundle="grid/index.scss" output="siimple-grid"
	${MAKE} build-module bundle="helpers/index.scss" output="siimple-helpers"
	@#${MAKE} build-module bundle="icons/index.scss" output="siimple-icons"
	${MAKE} build-module bundle="bundle.scss" output="siimple"
	## Generate SCSS bundles
	node ./scripts/bundle.js
	## Build neutrine
	${node_bin}/rollup -c rollup.config.js
	${MAKE} build-style input="./lib/bundle.scss" output="${pkgs_folder}/neutrine/dist/neutrine"

# Build a module
.PHONY: build-module
build-module:
	${MAKE} build-style input="./scss/${bundle}" output="${output_dist}/${output}"

# Build a style
.PHONY: build-style
build-style:
	${node_bin}/sass -I ./scss ${input} ${output}.css
	${node_bin}/postcss --use autoprefixer --config ./postcss.config.js --map false --output ${output}.css ${output}.css
	${node_bin}/cleancss --compatibility "*" --level 2 --output ${output}.min.css ${output}.css

# Build siimple website and documentation
.PHONY: build-website
build-website:
	cd ${website_folder} && ${MAKE} build

# Build a single package
.PHONY: build-package
build-package:
	cd ${pkgs_folder}/${pkg}/ && ${MAKE} build

# Run tests of the provided package or application
# Example: make test pkg="siimple-css"
.PHONY: test
test-package:
	cd ${pkgs_folder}/${pkg}/ && ${MAKE} test

# Test siimple documentation and website
.PHONY: test-website
test-website:
	cd ${website_folder} && ${MAKE} test

# Publish the provided package or application
# Example: make publish pkg="siimple-css"
.PHONY: publish
publish-package:
	cd ${pkgs_folder}/${pkg}/ && ${MAKE} publish

# Build and serve siimple website
# Sortcut for 'make build-website && make test-website'
.PHONY: docs website
website:
	${MAKE} build-website
	${MAKE} test-website
docs:
	# [WARNING] The docs command is deprecated --> documentation has been merged with website
	# [WARNING] Run $ make website instead
	${MAKE} website


