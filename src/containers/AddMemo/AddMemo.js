import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import axios from '../../axios-orders';

import './AddMemo.css';
import * as actions from '../../store/actions/index';

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
		const memoData = {
			id: new Date().getTime(),
			title: this.state.title,
			content: this.state.content,
			color: 'YELLOW'
		}
		this.props.onSaveMemo(memoData);
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

	newMemoClicked = () => {
		this.initMemo();
		this.props.onNewMemo();
	}

	render() {

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
							rows='10'
							placeholder='Content'
							name='content'
							className='textArea' />
					</ModalBody>
					<ModalFooter className='modalFooter'>
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
				<div className='newMemoBtn'>
					<i
						className="fas fa-plus"
						onClick={this.newMemoClicked}
						title='Create New Memo'></i>
				</div>
				{modal}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		showModal: state.showModal,
		showStoredMemo: state.showStoredMemo
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSaveMemo: (memoData) => dispatch(actions.saveMemo(memoData)),
		onNewMemo: () => dispatch({ type: 'NEW_MEMO' }),
		onToggleModal: () => dispatch({ type: 'TOGGLE_MODAL' })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMemo, axios);