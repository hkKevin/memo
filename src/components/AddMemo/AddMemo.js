import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

import './AddMemo.css';

class AddMemo extends Component {

	state = {
			title: '',
			content: '',
			hasTitle: false,
			hasContent: false
	}

  toggle = () => {
    this.props.onToggleModal();
	}

	saveMemo = () => {
		this.props.onSaveMemo(this.state.title, this.state.content);
	}

	deleteInput() {
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

	initMemo = () => {
		this.toggle();
		this.deleteInput();
	}

	titleChangedHandler = (event) => {
		if (event.target.value === null || event.target.value === '') {
			this.setState({hasTitle: false});
		} else {
			this.setState({hasTitle: true});
		}
		this.setState({title: event.target.value});
	}

	contentChangedHandler = (event) => {
		if (event.target.value === null || event.target.value === '') {
			this.setState({hasContent: false});
		} else {
			this.setState({hasContent: true});
		}
		this.setState({content: event.target.value});
  }

	newMemoClicked = () => {
		this.initMemo();
		this.props.onNewMemo();
	}

	render () {

		let atLeastOneInputHasValue = this.state.hasTitle || this.state.hasContent;

		let modal = null;
		if (!this.props.showStoredMemo) {
			modal = (
				<Modal 
					autoFocus
					centered
					isOpen={this.props.showModal} 
					toggle={this.toggle} 
					modalTransition={{ timeout: 1 }} 
					size='lg'>
          <ModalBody>
						<Input 
							onChange={this.titleChangedHandler} 
							value={this.state.title} 
							type='text' 
							placeholder='Title'
							name='title'
							className='inputField' />
						<hr />
						<Input 
							onChange={this.contentChangedHandler} 
							value={this.state.content} 
							type='textarea'
							rows='8' 
							placeholder='Content'
							name='content'
							className='textArea' />
          </ModalBody>
          <ModalFooter>
						<Button 
							outline
							color="secondary" 
							onClick={this.initMemo}>CANCEL</Button>
						<Button 
							outline
							color="primary" 
							onClick={this.saveMemoClicked}
							disabled={!atLeastOneInputHasValue}
							className='saveBtn'>SAVE</Button>
          </ModalFooter>
        </Modal>
			);
		}

		return (
			<div>
				<Button 
					color="warning" 
					onClick={this.newMemoClicked}
					className='newMemoBtn'>NEW MEMO</Button>
				{modal}
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
		showModal: state.showModal,
		title: state.title,
		content: state.content,
		showStoredMemo: state.showStoredMemo
  };
};

const mapDispatchToProps = dispatch => {
  return {
		onSaveMemo: (title, content) => dispatch({type: 'SAVE_MEMO', memoData: {title: title, content: content}}),
		onNewMemo: () => dispatch({type: 'NEW_MEMO'}),
		onToggleModal: () => dispatch({type: 'TOGGLE_MODAL'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemo);