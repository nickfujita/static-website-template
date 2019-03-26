import * as React from 'react';
import { connect } from 'react-redux';

class Container extends React.Component<any, any> {

  constructor(props, state) {
    super(props, state);
  }

  render() {
    const {
      children,
      dispatch,
      notifications,
    } = this.props;
    return (
      <div className='app_content'>
        {children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Container);
