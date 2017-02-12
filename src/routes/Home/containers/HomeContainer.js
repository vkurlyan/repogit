import { connect } from 'react-redux'
import { actions } from '../modules/repositoriesList'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component */

import HomeView from '../components/HomeView/HomeView'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  ...state.repoList
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
