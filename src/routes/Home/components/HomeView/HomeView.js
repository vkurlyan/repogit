import React, {PropTypes} from 'react'
import RepoList from '../RepoList/RepoList'
import './HomeView.scss'
import { PageHeader, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class HomeView extends React.PureComponent {

    constructor(state, props) {
        super(state, props);
        this.onSubmitUsername = this.onSubmitUsername.bind(this);
    }

    onSubmitUsername(e){
        e.preventDefault();
        this.props.showRepoList(this.usernameInput.value);
    }

    render() {
        const  {validationError, serverError, message, repositories} = this.props;

        return (
            <div>
                <PageHeader>List of a GitHub repositories</PageHeader>
                <form className="home__form" onSubmit={this.onSubmitUsername}>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={validationError ? 'error' : null}
                    >
                        <ControlLabel>Enter a GitHub username</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Username"
                            inputRef={(input) => { this.usernameInput = input; }}
                        />
                        {validationError && <div className="home__error">{validationError}</div>}
                    </FormGroup>

                    <Button type="submit" bsStyle="primary" >Submit</Button>

                    {serverError && <div className="home__error">{serverError}</div>}
                    {message && <div className="home__message">{message}</div>}
                </form>
                <RepoList repositories={repositories} />
            </div>
        )
    }
}

HomeView.propTypes = {
    showRepoList    : PropTypes.func.isRequired,
    repositories    : PropTypes.array.isRequired,
    validationError : PropTypes.string,
    serverError     : PropTypes.string,
    message         : PropTypes.string,
}

export default HomeView
