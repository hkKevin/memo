import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, Button, Input} from 'reactstrap';

import Memo from '../components/Memo/Memo';
import AddMemo from '../components/AddMemo/AddMemo';
import './Memos.css'

class Memos extends Component {
  
  // componentDidUpdate(){
  //   console.log(this.props.addedMemos)
  // }

  memoClicked = (memo) => {
    this.toggle();
    this.selectMemo(memo);
    this.storeId(memo);
  }

  deleteBtnClicked = () => {
    this.toggle();
    this.deleteMemo();
  }

  deleteMemo = () => {
    this.props.onDeleteMemo(this.props.selectedId)
  }

  toggle = () => {
    this.props.onToggleModal();
	}

  selectMemo = (memo) => {
    this.props.onSelectMemo(memo.title, memo.content)
  }

  storeId = (memo) => {
    this.props.onStoreId(memo.id)
  }

  titleChangedHandler = (event) => {
		// if (event.target.value === null || event.target.value === '') {
		// 	this.setState({hasTitle: false});
		// } else {
		// 	this.setState({hasTitle: true});
		// }
    //this.setState({title: event.target.value});
    this.props.onChangeTitle(event.target.value);
	}

	contentChangedHandler = (event) => {
		// if (event.target.value === null || event.target.value === '') {
		// 	this.setState({hasContent: false});
		// } else {
		// 	this.setState({hasContent: true});
		// }
    //this.setState({content: event.target.value});
    this.props.onChangeContent(event.target.value);
  }

  updateMemoClicked = () => {
    this.toggle();
    this.updateMemo();
  }

  updateMemo = () => {
    this.props.onUpdateMemo();
  }

  render () {
    let modal = null;
    if (this.props.showStoredMemo) {
      modal = (
        <div>
          <Modal 
            centered
            isOpen={this.props.showModal} 
            toggle={this.toggle} 
            modalTransition={{ timeout: 1 }} 
            size='lg'>
            <ModalBody>
              <Input 
                onChange={this.titleChangedHandler} 
                value={this.props.selectedMemoTitle} 
                type='text' 
                placeholder='Title'
                className='inputField' />
              <hr />
              <Input 
                onChange={this.contentChangedHandler} 
                value={this.props.selectedMemoContent} 
                type='textarea'
                rows='8' 
                placeholder='Content'
                className='textArea' />
            </ModalBody>
            <ModalFooter className='modalFooter'>
            <Button 
                outline
                color="danger" 
                onClick={this.deleteBtnClicked}
                className='deleteMemoBtn'>DELETE</Button>
              <Button 
                outline
                color="secondary" 
                onClick={this.toggle}>CANCEL</Button>
              <Button 
                outline
                color="primary" 
                onClick={this.updateMemoClicked}>UPDATE</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    } 

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

        {modal}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.showModal,
    addedMemos: state.memos,
    selectedMemoTitle: state.selectedMemoTitle,
    selectedMemoContent: state.selectedMemoContent,
    showStoredMemo: state.showStoredMemo,
    selectedId: state.selectedId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteMemo: (id) => dispatch({type: 'DELETE_MEMO', memoId: id}),
    onSelectMemo: (title, content) => dispatch({type: 'SELECT_MEMO', memoTitle: title, memoContent: content}),
    onToggleModal: () => dispatch({type: 'TOGGLE_MODAL'}),
    onStoreId: (id) => dispatch({type: 'STORE_ID', memoId: id}),
    onChangeTitle: (title) => dispatch({type: 'CHANGE_TITLE', memoTitle: title}),
    onChangeContent: (content) => dispatch({type: 'CHANGE_CONTENT', memoContent: content}),
    onUpdateMemo: () => dispatch({type: 'UPDATE_MEMO'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memos);