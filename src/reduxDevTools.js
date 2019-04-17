import { composeWithDevTools } from 'redux-devtools-extension';
import Parse from 'parse';

// "replacer" prevents the extension from hanging (because to JSON formatting)
// . the external "seen" ensures that the cache is global to the entire state
// . the custom encode function is based onParse's encode with a better usage of seen
const encode = (value, seen) => {
	if (value instanceof Parse.Object) {
		try {
			return value.toJSON();
		} catch (error) {
			// . can happen if there's a ParseObject without an id (not already saved)
			// . the toPointer function throws Cannot create a pointer to an unsaved ParseObject
			const json = {};

			const attrs = value.attributes;
			for (const attr in attrs) {
				if (attrs.hasOwnProperty(attr)) {
					json[attr] = attrs[attr]; // shallow but faster (an stack overflow safe) //encode(attrs[attr], seen);
				}
			}

			if (value.id) {
				json.id = value.id;
			}
			return json;
		}
	}

	if (toString.call(value) === '[object Date]') {
		if (isNaN(value)) {
			throw new Error('Tried to encode an invalid date.');
		}
		return { __type: 'Date', iso: value.toJSON() };
	}

	if (toString.call(value) === '[object RegExp]' &&
		typeof value.source === 'string') {
		return value.source;
	}

	if (Array.isArray(value)) {
		return value.map((v) => {
			return encode(v, seen);
		});
	}
	return value;
};

const seen = new Set();
const composeEnhancers = composeWithDevTools({
	maxAge: 20,
	stateSanitizer: state => {
		seen.clear();
		return state;
		/*return {
		 ...state,
		 lessons: {
		 ...state.lessons,
		 rootLessonNode: "---- HIDDEN LESSON NODE TREE (see index.js) ----"
		 }
		 }*/
	},
	serialize: {
		replacer: (key, value) => {
			if (value && value.constructor) {
				return encode(value, seen);
			}
			return value;
		}
	}
});

export default composeEnhancers;