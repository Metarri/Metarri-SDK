import { compose, createStore } from 'redux';
import persistState from 'redux-localstorage'


// reducers
export const switchIntent = (intent: any) => ({
    intent
});
// end reducers



export type iGamerState = any;


const enhancer = compose(
    persistState(undefined, 'iGamer', () => { }),
)

enum Actions {
    SWITCH_INTENT = ''
}

const store = createStore((state: iGamerState = {}, action) => {
    switch (action.type) {
        case Actions.SWITCH_INTENT:
            return {
                ...state as Object,
                currentIntent: (action as any).intent
            } as iGamerState;

        default:
            return state
    }
}, enhancer as any);


export default store;
