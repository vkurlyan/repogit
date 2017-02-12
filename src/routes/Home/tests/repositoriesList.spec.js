import repoListReducer, {FETCH_REPOSITORIES, INVALID_USERNAME} from '../modules/repositoriesList'
import { resolve, reject } from 'redux-simple-promise';

const state = {}

describe('Repositories List Reducers', () => {
    it('shows validation error', () => {
        const validationError = 'invalid username';
        const newState = repoListReducer(state, {
            type: INVALID_USERNAME,
            validationError: validationError
        });

        expect(newState).not.toBe(state);
        expect(newState.validationError).toBe(validationError);
    });

    it('successfully fetches repositories', () => {
        const newState = repoListReducer(state, {
            type: resolve(FETCH_REPOSITORIES),
            payload: {
                data: [{id:1}, {id:2}]
            }
        });

        expect(newState).not.toBe(state);
        expect(newState.repositories.length).toBe(2);
    });

    it('unsuccessfully fetch repositories', () => {
        const newState = repoListReducer(state, {
            type: reject(FETCH_REPOSITORIES),
            payload: {
                response: {
                    status: 404
                }
            }
        });
        
        expect(newState).not.toBe(state);
        expect(newState.serverError).toBeTruthy();
    });
});


