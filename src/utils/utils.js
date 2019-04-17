import { push as routerPush, goBack as goBackInRouter } from 'react-router-redux';


const CONNECTION_ERROR = "Votre connexion est perturbée et ne vous a pas permis de poursuivre l'action que vous souhaitiez réaliser. Vérifiez vos paramètres de connexion et tentez à nouveau.";
const LOGIN_ERROR = "Oups ! Il semblerait que vous vous soyez trompé sur les informations saisies. Nous vous invitons à essayer de nouveau ou à réinitialiser votre mot de passe.";


/**
 * returns a thunk
 * @param {Promise<Promise>} longPromiseCreatorOrPromise signature if creator: (dispatch : Function) : Promise
 */
export function actionWithLoader(longPromiseCreatorOrPromise) {
    return async (dispatch, getState) => {
        dispatch({
            type: "LOADING_START"
        });
        try {
            if (typeof longPromiseCreatorOrPromise === "function") {
                await longPromiseCreatorOrPromise(dispatch, getState);
            } else {
                await longPromiseCreatorOrPromise;
            }
        } catch (error) {
            showError(error)(dispatch);
        } finally {
            dispatch({
                type: "LOADING_END"
            });
        }

        return Promise.resolve();
    }
}

export function onEnter({store, actionThunk, getReplacingPath, withLoader = true}) {
    return async (nextState, replace, callback) => {
        try {
            if (getReplacingPath) {
                const replacingPath = await getReplacingPath(store.getState, nextState);
                if (replacingPath) {
                    replace(replacingPath);
                    callback();
                    return;
                }
            }

            //---- actual call ----//
            if (actionThunk) {
                const dispatchingFunction = actionThunk(nextState.params);
                let result;
                if (withLoader) {
                    result = actionWithLoader(dispatchingFunction)(store.dispatch, store.getState);
                } else {
                    result = dispatchingFunction(store.dispatch, store.getState);
                }
                if (result && result.then) {
                    await result;
                }
            }

            callback();
        } catch (error) {
            console.error(error);
            callback(error);
        }
    }
}

export function push(pathname, returnPath) {
    // pathname might already be a location object
    const location = returnPath ? routerLocation(pathname, returnPath) : pathname;
    return routerPush(location);
}

export function routerLocation(pathname, returnPath) {
    if (typeof returnPath !== 'string') {
        // can be an Event (eg: onClick={showxxx})
        returnPath = undefined;
    }
    return {
        pathname,
        state: {
            returnPath
        }
    };
}

export function getErrorMessageFr(error) {
	if (!error || typeof error === 'string') return error;
	switch(error.code) {
		case 100:
			return CONNECTION_ERROR;
		case 101:
			return LOGIN_ERROR;
		default:
			return error.message;
	}
}

export function showError(errorOrMessage) {
	return dispatch => {
		try {
			console.error(errorOrMessage);
			//const message = typeof errorOrMessage === "string" ? errorOrMessage : errorOrMessage.message;
			dispatch({
				type: "ERROR",
				message: getErrorMessageFr(errorOrMessage)
			});
		} catch (error) {
			console.error(error.message);
		}

	}
}


export function getReplacingPath() {
    return async (getState, nextState) => {
        return {
            pathname: '/chat',
            state: {
                returnPath: nextState.location.pathname
            }
        }
    }
}