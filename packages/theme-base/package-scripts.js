module.exports = {
	scripts: {
		clean: "rimraf dist",
		build: {
			default: "nps clean build.defaultTheme build.themes",
			defaultTheme: {
				default: "nps build.defaultTheme.less build.defaultTheme.postcss",
				less: "lessc src/themes/sap_fiori_3/parameters-bundle.less dist/themes/sap_fiori_3/parameters-bundle.css",
				postcss: "postcss dist/themes/sap_fiori_3/parameters-bundle.css --config config/postcss.defaultTheme --base dist/ --dir dist/css/",
			},
			themes: {
				default: "nps build.themes.less build.themes.postcss",
				less: {
					default: "nps build.themes.less.belize build.themes.less.belize_hcb build.themes.less.fiori_3_dark",
					belize: "lessc src/themes/sap_belize/parameters-bundle.less dist/themes/sap_belize/parameters-bundle.css",
					belize_hcb: "lessc src/themes/sap_belize_hcb/parameters-bundle.less dist/themes/sap_belize_hcb/parameters-bundle.css",
					fiori_3_dark: "lessc src/themes/sap_fiori_3_dark/parameters-bundle.less dist/themes/sap_fiori_3_dark/parameters-bundle.css",
				},
				postcss: "postcss dist/**/parameters-bundle.css --config config/postcss.themes --base dist/ --dir dist/css/",
			}
		},
		start: "nps build watch",
		watch: {
			default: 'concurrently "nps watch.defaultTheme" "nps watch.themes"',
			defaultTheme: {
				default: 'concurrently "nps watch.defaultTheme.less" "nps watch.defaultTheme.postcss"',
				less: 'chokidar "src/themes/sap_fiori_3/*.less" -c "nps build.defaultTheme.less"',
				postcss: 'nps "build.defaultTheme.postcss -w"',
			},
			themes: {
				default: 'concurrently "nps watch.themes.less" "nps watch.themes.postcss"',
				less: 'chokidar "src/themes/**/*.less" -c "nps build.themes.less"',
				postcss: 'nps "build.themes.postcss -w"',
			}
		},
	},
};
