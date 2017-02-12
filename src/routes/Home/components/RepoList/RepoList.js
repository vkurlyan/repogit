import React, { PropTypes } from 'react'
import { ListGroupItem, ListGroup } from 'react-bootstrap'

class RepoList extends React.PureComponent {
  render () {
    if (!this.props.repositories) {
      return
    }

    return (
      <ListGroup>
        {this.props.repositories.map((repo) => (
          <ListGroupItem key={String(repo.id)} target='_blank' href={repo.html_url}>
            <b>{repo.name}</b>
            {repo.description && `: ${repo.description}`}
          </ListGroupItem>
                ))}
      </ListGroup>
    )
  }
}

RepoList.propTypes = {
  repositories : PropTypes.array
}

export default RepoList
