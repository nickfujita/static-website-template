import * as React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component<any, any> {

  render() {
    const { dispatch } = this.props;
    return (
      <div className='home'>
        hello
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);
