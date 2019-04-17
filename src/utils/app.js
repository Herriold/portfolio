import { push as routerPush} from 'react-router-redux';

export function closeError() {
	return { type: "CLOSE_ERROR" };
}

export function closeMessage() {
	return { type: "CLOSE_MESSAGE" };
}


export function onEnterApp(store) {
	return async (nextState, replace, callback) => {
		try {
			callback();
		} catch(error) {
			console.error(error);
			callback(error);
		}
	}
}

export function onEnterHome(store) {
    return async (nextState, replace, callback) => {
        try {
            replace("/");
            callback();
        } catch(error) {
            console.error(error);
            callback(error);
        }
    }
}

export function sitePassword(sitePassword) {
	return dispatch => {
		dispatch({
			type: 'SITE_PASSWORD',
			sitePassword
		});
		dispatch(showHome());
	}
}

function routerLocation(pathname, returnPath) {
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

function push(pathname, returnPath) {
    // pathname might already be a location object
    const location = returnPath ? routerLocation(pathname, returnPath) : pathname;
    return routerPush(location);
}

//--------------------------------------------------------//
//----------------------- screen -------------------------//
//--------------------------------------------------------//
export function updateScreen(screen) {
	return async dispatch => {
		dispatch({
			type: 'SCREEN_UPDATED',
			screen
		});
	}
}

//----------------------------------------------------------------//

//--------------------------------------------------------//
//---------------------- Routing -------------------------//
//--------------------------------------------------------//
export function showHome() {
	return push('/');
}
