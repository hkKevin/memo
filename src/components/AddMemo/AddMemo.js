import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

import './AddMemo.css';

class AddMemo extends Component {

	constructor(props) {
    super(props);
    this.state = {
			modal: false,
			title: '',
			content: '',
			hasTitle: false,
			hasContent: false,
			hasTitleAndContent: false,
			showConfirmBtn: false
    };

    this.toggle = this.toggle.bind(this);
	}

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
	}

	addMemo() {
		this.props.onAddMemo(this.state.title, this.state.content);
	}

	deleteInput() {
		this.setState({
			title: '',
			hasTitle: '',
			content: '',
			hasContent: ''
		})
	}

	confirmMemoClicked = () => {
		this.toggle();
		this.addMemo();
	}

	newMemo = () => {
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

	render () {

		let atLeastOneInputHasValue = this.state.hasTitle || this.state.hasContent;

		return (
			<div>
				
        <Button color="warning" onClick={this.newMemo}>New Memo</Button>

				<Modal isOpen={this.state.modal} toggle={this.toggle} modalTransition={{ timeout: 0 }} size='lg'>
          <ModalBody>
						<Input 
							onChange={this.titleChangedHandler} 
							value={this.state.title} 
							type='text' 
							placeholder='Title'
							name='title'
							className='InputField' />
						<hr />
						<Input 
							onChange={this.contentChangedHandler} 
							value={this.state.content} 
							type='textarea'
							rows='8' 
							placeholder='Content'
							name='content'
							className='TextArea' />
          </ModalBody>
          <ModalFooter>
						<Button color="primary" 
							onClick={this.confirmMemoClicked}
							disabled={!atLeastOneInputHasValue}>Confirm</Button>
          </ModalFooter>
        </Modal>

				<button 
					onClick={() => this.props.onAddMemo(this.state.title, this.state.content)}
					disabled={!atLeastOneInputHasValue}>Add Memo</button>

			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
  return {
    onAddMemo: (title, content) => dispatch({type: 'ADD_MEMO', memoData: {title: title, content: content}})
  };
};

export default connect(null, mapDispatchToProps)(AddMemo);