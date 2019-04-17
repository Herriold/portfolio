/**
 * modified version of redux-thunk-
 * @param errorHandler
 * @param extraArgument
 * @returns {function({dispatch?: *, getState?: *}): function(*): function(*=)}
 */
function createThunkMiddleware(errorHandler, extraArgument) {
	return ({ dispatch, getState }) => next => async action => {
		if (typeof action === 'function') {
			try {
				return await action(dispatch, getState, extraArgument);
			} catch (err) {
				errorHandler(err, getState(), action, dispatch);
				return err;
			}
		}

		try {
			return next(action);
		} catch (err) {
			errorHandler(err, getState(), action, dispatch);
			return err;
		}
	};
}

export default createThunkMiddleware;
