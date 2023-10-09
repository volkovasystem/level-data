!function webpackUniversalModuleDefinition(root,factory){"object"==typeof exports&&"object"==typeof module?module.exports=factory():"function"==typeof define&&define.amd?define("levelData",[],factory):"object"==typeof exports?exports.levelData=factory():root.levelData=factory()}(this,(()=>(()=>{"use strict";var __webpack_modules__={380:(module,__unused_webpack_exports,__webpack_require__)=>{
/*;!
	@license:module:
		MIT License

		Copyright (c) 2023-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebedor

			<@license:year-range:2023-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@license:copyright;

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@license:module;
*/
const OBJECT_TYPE=__webpack_require__.g.OBJECT_TYPE||"object",STRING_TYPE=__webpack_require__.g.STRING_TYPE||"string",UNDEFINED_TYPE=__webpack_require__.g.UNDEFINED_TYPE||"undefined",NATIVE_CODE_PATTERN=/\[native\scode\]/,OBJECT_CLASS_PATTERN=/Object\(\)/;module.exports=function levelData(data,option){if(typeof data!=OBJECT_TYPE||null===data||Object.keys(data).length<=0)return data;const leanStatus=!0===(option=option||{}).leanStatus,resultData={},dataStack=[],fieldListStack=[],parentFieldStack=[];let parentField,currentField,field,value,fieldList=Object.keys(data),parentData=data,currentData=data;for(let index=fieldList.length;index>=-1;index--){field=fieldList.pop(),value=currentData[field],currentField=[!0===Array.isArray(parentData)?`${parentField||""}[${field}]`:parentField,!0===Array.isArray(parentData)?void 0:field].filter(Boolean).join(".");let nativeObjectStatus=!1,arrayObjectStatus=!1;typeof value==OBJECT_TYPE?(arrayObjectStatus=!0===Array.isArray(value),!0!==arrayObjectStatus&&"constructor"in value==!0&&!0===NATIVE_CODE_PATTERN.test(value.constructor.toString())&&!0===OBJECT_CLASS_PATTERN.test(value.constructor.toString())&&(value=Object.assign({},value),nativeObjectStatus=!0),(!0!==leanStatus||!0!==nativeObjectStatus&&!0!==arrayObjectStatus)&&(resultData[currentField]=value),dataStack.push(parentData),fieldListStack.push(fieldList),parentFieldStack.push(parentField),parentField=currentField,parentData=value,currentData=parentData,fieldList=Object.keys(parentData),index=fieldList.length):typeof currentField==STRING_TYPE&&currentField.length>0&&typeof value!=UNDEFINED_TYPE&&(resultData[currentField]=value),index<=0&&dataStack.length>0&&(parentData=dataStack.pop(),currentData=parentData,fieldList=fieldListStack.pop(),parentField=parentFieldStack.pop(),index=fieldList.length)}return resultData}}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}return __webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__(380)})()));