import RepoList from '../components/RepoList/RepoList'
import renderer from 'react-test-renderer';
import React from 'react';

const repoListParams = {
    repositories: [
        {
            "id": 1,
            "name": "test-name",
            "html_url": "/1",
            "description": "Description 1",
        },
        {
            "id": 2,
            "name": "test-name-2",
            "html_url": "/2",
        }
    ],
};

describe('RepoList', () => {
    it('shows empty list', () => {
        const component = renderer.create(
            <RepoList repositories={[]} />
        ).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('shows list of repositories', () => {
        const component = renderer.create(
            <RepoList {...repoListParams} />
        ).toJSON();

        expect(component).toMatchSnapshot();
    });
});
