import { connect } from 'react-redux';
import Admin from './Admin';
import { addUser, getUser } from './admin.actions';

const mapStateToProps = state => ({
  formStatus: state.admin.adminMessage.formStatus,
  blockStatus: state.admin.adminMessage.blockStatus,
  isSubmitting: state.admin.adminUi.isSubmitting,
  isFetching: state.admin.adminUi.isFetching,
  users: state.admin.adminStore.users
});

const mapDispatchToProps = dispatch => ({
  addUser: payload => dispatch(addUser(payload)),
  getUser: () => dispatch(getUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
