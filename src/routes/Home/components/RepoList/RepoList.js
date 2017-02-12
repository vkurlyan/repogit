import React, {PropTypes} from 'react'
// import './RepoList.scss'
import { ListGroupItem, ListGroup } from 'react-bootstrap';

class RepoList extends React.PureComponent {
    render() {
        return (
            <ListGroup>
                {this.props.repositories.map((repo) => (
                    <ListGroupItem key={String(repo.id)} target="_blank" href={repo.html_url}>
                        <b>{repo.name}</b>
                        {repo.description && `: ${repo.description}`}
                    </ListGroupItem>
                ))}
            </ListGroup>
        )
    }
}

RepoList.propTypes = {
    repositories : PropTypes.array.isRequired,
}

export default RepoList
