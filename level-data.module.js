"use strict";

/*;
	@license:module:
		MIT License

		Copyright (c) 2021-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebedor

			<@license:year-range:2021-present;>

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

const levelData = (
	function levelData( object ){
		/*;
			@definition:
				@procedure: #levelData
					@description:
						Flatten object.

						This uses single level loop flow procedure.
					@description;
				@procedure;

				@parameter: #object
					@type:
							object
					@type;

					@description:
					@description;

					@required;
				@parameter;

				@result:#result
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
						object
					!=	"object"
				)
			||
				(
						object
					===	null
				)
			||
				(
						Object
						.keys(
							(
								object
							)
						)
						.length
					<=	0
				)
		){
			return	(
						undefined
					);
		}

		const resultData = (
			{
				$result: (
					{ }
				)
			}
		);

		const objectStack = (
			[ ]
		);

		const propertyListStack = (
			[ ]
		);

		const parentPropertyStack = (
			[ ]
		);

		let propertyList = (
			Object
			.keys(
				(
					object
				)
			)
		);

		let parentObject = (
			object
		);

		let currentObject = (
			object
		);

		let parentProperty = (
			undefined
		);

		let currentProperty = (
			undefined
		);

		let property = (
			undefined
		);

		let value = (
			undefined
		);

		for(
			let index = propertyList.length;
			index >= -1;
			index--
		){
			(
					property
				=	(
						propertyList
						.pop( )
					)
			);

			(
					value
				=	(
						currentObject[ property ]
					)
			);

			(
					currentProperty
				=	(
						[
							parentProperty,

							(
									(
											(
													Array
													.isArray(
														(
															parentObject
														)
													)
												===	true
											)
									)
								?	(
										`@Array:$${ property }`
									)
								:	(
										property
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
								"."
							)
						)
					)
			);

			if(
					(
							typeof
							value
						==	"object"
					)
			){
				objectStack
				.push(
					(
						parentObject
					)
				);

				propertyListStack
				.push(
					(
						propertyList
					)
				);

				parentPropertyStack
				.push(
					(
						parentProperty
					)
				);

				(
						resultData
						.$result[ currentProperty ]
					=	(
							value
						)
				);

				(
						parentProperty
					=	(
							currentProperty
						)
				);

				(
						parentObject
					=	(
							value
						)
				);

				(
						currentObject
					=	(
							parentObject
						)
				);

				(
						propertyList
					=	(
							Object
							.keys(
								(
									parentObject
								)
							)
						)
				);

				(
						index
					=	(
							propertyList
							.length
						)
				);
			}
			else if(
					(
							typeof
							currentProperty
						==	"string"
					)
				&&
					(
							currentProperty
							.length
						>	0
					)
				&&
					(
							typeof
							value
						!=	"undefined"
					)
			){
				(
						resultData
						.$result[ currentProperty ]
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
							objectStack
							.length
						>	0
					)
			){
				(
						parentObject
					=	(
							objectStack
							.pop( )
						)
				);

				(
						currentObject
					=	(
							parentObject
						)
				);

				(
						propertyList
					=	(
							propertyListStack
							.pop( )
						)
				);

				(
						parentProperty
					=	(
							parentPropertyStack
							.pop( )
						)
				);

				(
						index
					=	(
							propertyList
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
