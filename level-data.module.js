"use strict";

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

const OBJECT_TYPE = (
		(
			global
			.OBJECT_TYPE
		)
	||
		(
			"object"
		)
);

const STRING_TYPE = (
		(
			global
			.STRING_TYPE
		)
	||
		(
			"string"
		)
);

const UNDEFINED_TYPE = (
		(
			global
			.UNDEFINED_TYPE
		)
	||
		(
			"undefined"
		)
);

const DOT_SEPARATOR = (
	"."
);

const CONSTRUCTOR_FIELD = (
	"constructor"
);

const NATIVE_CODE_PATTERN = (
	/\[native\scode\]/
);

const OBJECT_CLASS_PATTERN = (
	/Object\(\)/
);

const levelData = (
	function levelData( data, option ){
		/*;
			@definition:
				@procedure: #levelData
					@description:
						Flatten data.

						This uses single level loop flow procedure.
					@description;
				@procedure;

				@parameter: #data
					@type:
							object
					@type;

					@description:
					@description;

					@required;
				@parameter;

				@parameter: #option
					@type:
							object
					@type;

					@description:
					@description;
				@parameter;

				@result: #result
					@type:
							object
					@type;

					@description:
					@description;
				@result;

				@trigger: #trigger
					@type:
							object:as:Error
					@type;

					@description:
					@description;
				@trigger;
			@definition;
		*/

		if(
				(
						typeof
						data
					!=	OBJECT_TYPE
				)
			||
				(
						data
					===	null
				)
			||
				(
						Object
						.keys(
							(
								data
							)
						)
						.length
					<=	0
				)
		){
			return	(
						data
					);
		}

		(
				option
			=	(
						(
							option
						)
					||
						(
							{ }
						)
				)
		);

		const leanStatus = (
				option
				.leanStatus
			===	true
		);

		const resultData = (
			{ }
		);

		const dataStack = (
			[ ]
		);

		const fieldListStack = (
			[ ]
		);

		const parentFieldStack = (
			[ ]
		);

		let fieldList = (
			Object
			.keys(
				(
					data
				)
			)
		);

		let parentData = (
			data
		);

		let currentData = (
			data
		);

		let parentField = (
			undefined
		);

		let currentField = (
			undefined
		);

		let field = (
			undefined
		);

		let value = (
			undefined
		);

		for(
			let index = fieldList.length;
			index >= -1;
			index--
		){
			(
					field
				=	(
						fieldList
						.pop( )
					)
			);

			(
					value
				=	(
						currentData[ field ]
					)
			);

			(
					currentField
				=	(
						[
							(
									(
											(
													Array
													.isArray(
														(
															parentData
														)
													)
												===	true
											)
									)
								?	(
										`${ parentField || "" }[${ field }]`
									)
								:	(
										parentField
									)
							),

							(
									(
											(
													Array
													.isArray(
														(
															parentData
														)
													)
												===	true
											)
									)
								?	(
										undefined
									)
								:	(
										field
									)
							)
						]
						.filter(
							(
								Boolean
							)
						)
						.join(
							(
								DOT_SEPARATOR
							)
						)
					)
			);

			let nativeObjectStatus = false;
			let arrayObjectStatus = false;

			if(
					(
							typeof
							value
						==	OBJECT_TYPE
					)
			){
				(
						arrayObjectStatus
					=	(
								(
										Array
										.isArray(
											(
												value
											)
										)
									===	true
								)
						)
				);

				if(
						(
								arrayObjectStatus
							!==	true
						)
					&&
						(
								(
										(
												CONSTRUCTOR_FIELD
											in	value
										)
									===	true
								)
							&&
								(
										(
											NATIVE_CODE_PATTERN
										)
										.test(
											(
												value
												.constructor
												.toString( )
											)
										)
									===	true
								)
							&&
								(
										(
											OBJECT_CLASS_PATTERN
										)
										.test(
											(
												value
												.constructor
												.toString( )
											)
										)
									===	true
								)
						)
				){
					(
							value
						=	(
								Object
								.assign(
									(
										{ }
									),

									(
										value
									)
								)
							)
					);

					(
							nativeObjectStatus
						=	(
								true
							)
					);
				}

				(
						(
							!	(
										(
												leanStatus
											=== true
										)
									&&
										(
												(
														nativeObjectStatus
													===	true
												)
											||
												(
														arrayObjectStatus
													===	true
												)
										)
								)
						)
				)	&&
				(
						resultData[ currentField ]
					=	(
							value
						)
				);

				dataStack
				.push(
					(
						parentData
					)
				);

				fieldListStack
				.push(
					(
						fieldList
					)
				);

				parentFieldStack
				.push(
					(
						parentField
					)
				);

				(
						parentField
					=	(
							currentField
						)
				);

				(
						parentData
					=	(
							value
						)
				);

				(
						currentData
					=	(
							parentData
						)
				);

				(
						fieldList
					=	(
							Object
							.keys(
								(
									parentData
								)
							)
						)
				);

				(
						index
					=	(
							fieldList
							.length
						)
				);
			}
			else if(
					(
							typeof
							currentField
						==	STRING_TYPE
					)
				&&
					(
							currentField
							.length
						>	0
					)
				&&
					(
							typeof
							value
						!=	UNDEFINED_TYPE
					)
			){
				(
						resultData[ currentField ]
					=	(
							value
						)
				);
			}

			if(
					(
							index
						<=	0
					)
				&&
					(
							dataStack
							.length
						>	0
					)
			){
				(
						parentData
					=	(
							dataStack
							.pop( )
						)
				);

				(
						currentData
					=	(
							parentData
						)
				);

				(
						fieldList
					=	(
							fieldListStack
							.pop( )
						)
				);

				(
						parentField
					=	(
							parentFieldStack
							.pop( )
						)
				);

				(
						index
					=	(
							fieldList
							.length
						)
				);
			}
		}

		return	(
					resultData
				);
	}
);

(
		module
		.exports
	=	(
			levelData
		)
);
