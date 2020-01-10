# MLreef front-end guidelines

## Project structure

* Configuration files can be at the "web" folder
* All React components and Javascript files related with the functionalities must be located at "web/src"
* "actions" folder contains react-redux functions to update the redux state
* APIs folder contains calls to resources provided by Gitlab API
* "components" is the main folder, it contains all the project pieces of code and their styles abstracted in modules, which can be reused by copying and pasting.
* If a component has its CSS file to customize it, the JS and CSS files must be grouped at the same folder
* The "CSS" folder should only contain general styles that can be used everywhere.
* "functions" folder contains abstract operations like conversions, math calculations, validations and other logic which is used in modules but separated for readability purposes

## Files naming

* Tests are always in "src/\__tests\__" folder, files in this folder must always finish with ".test.js"
* Camell case will be used throughout the project for files(except for some configuration files that have to be named in other ways), for folder the words should be separated by "-"

## Env vars

* The .env file contains vars that can be read for multiple purposes. eg. url of the corresponding backend instance.