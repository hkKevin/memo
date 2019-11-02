import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';

// Toast is same as Snackbar
class Toast extends Component {

  hideToast = (event, reason) => {
    // Click away from the toast will not hide the toast
    if (reason === 'clickaway') { 
      return; 
    }
    // trigger the change of Redux state
    this.props.onHideToast();
  }

  render() {

 let showToast = false;
    // Notify user when the web app completed an action
    if (this.props.toastMsg) {
      showToast = true;
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showToast}
          autoHideDuration={3000}
          onClose={this.hideToast}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.toastMsg}</span>}
        />
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onHideToast: () => dispatch({ type: 'HIDE_TOAST' })
  };
};

export default connect(null, mapDispatchToProps)(Toast);