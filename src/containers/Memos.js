import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

import Memo from '../components/Memo/Memo';
import AddMemo from '../components/AddMemo/AddMemo';

class Memos extends Component {

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
  
  deleteInput() {
		this.setState({
			title: '',
			hasTitle: '',
			content: '',
			hasContent: ''
		})
	}

	initMemo = () => {
		this.toggle();
		this.deleteInput();
	}

  componentDidUpdate(){
    console.log(this.props.addedMemos)
  }

  memoClicked = (memo) => {
    this.toggle();
    this.selectMemo(memo);
  }

  selectMemo = (memo) => {
    this.props.onSelectMemo(memo.title, memo.content)
  }

  render () {
    return (
      <div>
        <AddMemo />
        {this.props.addedMemos.map(memo => (
          <Memo 
            key={memo.id}
            title={memo.title} 
            content={memo.content} 
            clicked={() => this.memoClicked(memo)}/>
        ))}

        <Modal isOpen={this.state.modal} toggle={this.toggle} modalTransition={{ timeout: 0 }} size='lg'>
          <ModalBody>
						<Input 
							onChange={this.titleChangedHandler} 
							value={this.props.selectedMemoTitle} 
							type='text' 
							placeholder='Title'
							name='title'
							className='InputField' />
						<hr />
						<Input 
							onChange={this.contentChangedHandler} 
							value={this.props.selectedMemoContent} 
							type='textarea'
							rows='8' 
							placeholder='Content'
							name='content'
							className='TextArea' />
          </ModalBody>
          <ModalFooter>
						<Button color="danger" 
							onClick={this.toggle}>CANCEL</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedMemos: state.memos,
    selectedMemoTitle: state.selectedMemoTitle,
    selectedMemoContent: state.selectedMemoContent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteMemo: (id) => dispatch({type: 'DELETE_MEMO', memoId: id}),
    onSelectMemo: (title, content) => dispatch({type: 'SELECT_MEMO', memoTitle: title, memoContent: content})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memos);