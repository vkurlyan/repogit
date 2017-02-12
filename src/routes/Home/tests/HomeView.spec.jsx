import HomeView from '../components/HomeView/HomeView'
import renderer from 'react-test-renderer';
import React from 'react';

const homeViewParams = {
    repositories: [],
    showRepoList: ()=>{}
};

describe('HomeView', () => {
    it('shows form', () => {
        const component = renderer.create(
            <HomeView {...homeViewParams} />
        ).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('shows messages', () => {
        const params = {
            ...homeViewParams,
            message: 'user has no repositories',
            validationError: 'it\'s required field',
            serverError: 'Server error'
        };
        
        const component = renderer.create(
            <HomeView {...params} />
        ).toJSON();

        expect(component).toMatchSnapshot();
    });
});
