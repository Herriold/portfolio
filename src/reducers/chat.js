import { getData } from "..";

const defaultSate = {
    messages: [],
};

export default function (state = defaultSate, action) {
    switch (action.type) {
        case "MESSAGES_LOADED":
            return {
                ...state,
                messages: action.messages
            };
        default:
            return state;
    }
}