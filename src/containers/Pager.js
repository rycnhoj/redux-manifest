import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, withHandlers, withProps } from 'recompose'
import * as pagerLogic from '../components/Pager/pagerLogic'

import Pager from '../components/Pager'
import * as actions from '../actions'
import stateByName from '../util/stateByName'

const mapStateToProps = (state, props) => {
  const namedState = stateByName(state, props.name)
  return {
    filter: namedState.filter,
    count: namedState.count,
    loadingCount: namedState.loadingCount,
    loadingData: namedState.loadingData
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  refreshData: actions.refreshData
}, dispatch)

const handlers = {
  changePage: props => event => {
    const nextPage = event.target.getAttribute('data-page')
    props.refreshData(props.name, {...props.filter, page: nextPage})
  }
}

const mapExtraProps = props => {
  return {
    numberedPageButtons: pagerLogic.buildArrayOfNumberedPagerButtons(props)
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers),
  withProps(mapExtraProps)
)

export default enhance(Pager)
