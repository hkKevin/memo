import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';

import './AddMemo.css';
import * as actions from '../../store/actions/index';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});

class AddMemo extends Component {

	state = {
		title: "",
		content: "",
		hasTitle: false,
		hasContent: false
	}

	toggle = () => {
		this.props.onToggleModal();
		this.deleteInput();	// Clear previous input fields
	}

	saveMemo = () => {
		const memoData = {
			id: new Date().getTime(),
			title: this.state.title,
			content: this.state.content,
			color: 'YELLOW',
			archived: false
		}
		this.props.onSaveMemo(memoData);
	}

	// Clear previous input fields
	deleteInput = () => {
		this.setState({
			title: '',
			content: '',
			hasTitle: false,
			hasContent: false
		})
	}

	saveMemoClicked = () => {
		this.toggle();
		this.saveMemo();
	}

	titleChangedHandler = (event) => {
		if (event.target.value === null || event.target.value === '') {
			this.setState({ hasTitle: false });
		} else {
			this.setState({ hasTitle: true });
		}
		this.setState({ title: event.target.value });
	}

	contentChangedHandler = (event) => {
		if (event.target.value === null || event.target.value === '') {
			this.setState({ hasContent: false });
		} else {
			this.setState({ hasContent: true });
		}
		this.setState({ content: event.target.value });
	}

	render() {

		let atLeastOneInputHasValue = this.state.hasTitle || this.state.hasContent;

    const { classes } = this.props;

    let dialog = null;
		if (!this.props.showStoredMemo) {
      dialog = (
        <div>
          <Dialog
            open={this.props.showModal}
            onClose={this.toggle}
            fullWidth={true}
            maxWidth="sm"
          >
            <DialogTitle id="form-dialog-title">New Memo</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="normal"
                id="memoTitle"
                label="Title"
                type="text"
                fullWidth
                required
                onChange={this.titleChangedHandler}
                value={this.state.title}
              />
              <TextField
                margin="normal"
                id="memoContent"
                label="Content"
                type="text"
                fullWidth
                required
                multiline
                rows='10'
                onChange={this.contentChangedHandler}
                value={this.state.content}
              />
            </DialogContent>
            <DialogActions className={classes.root}>
              <Button 
                onClick={this.saveMemoClicked} 
                variant="text" 
                color="primary" 
                className={classes.button} 
                disabled={!atLeastOneInputHasValue}>
                SAVE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
		}

		return (
			<div>
        {dialog}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
    showStoredMemo: state.showStoredMemo,
		showModal: state.showModal
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSaveMemo: (memoData) => dispatch(actions.saveMemo(memoData)),
    onToggleModal: () => dispatch({ type: 'TOGGLE_MODAL' })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddMemo, axios));