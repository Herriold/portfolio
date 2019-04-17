
import { actionWithLoader, getReplacingPath, onEnter, push } from "../../utils/utils";

export default function showChat() {
	return push('/chat');
}

export function loadMessage() {
    return actionWithLoader(async (dispatch, getState) => {
        dispatch({
            type: 'MESSAGE_LOADED',
        })
    })
}

export function onEnterChats(store) {
    return onEnter({
        store
    })
}