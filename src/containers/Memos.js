import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, Button, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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

  render () {
    let modal = null;
    if (this.props.showStoredMemo) {
      modal = (
        <div>
          <Modal 
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
                name='title'
                className='inputField' />
              <hr />
              <Input 
                onChange={this.contentChangedHandler} 
                value={this.props.selectedMemoContent} 
                type='textarea'
                rows='8' 
                placeholder='Content'
                name='content'
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
                onClick={this.toggle}>UPDATE</Button>
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
    title: state.title,
    content: state.content,
    showStoredMemo: state.showStoredMemo,
    selectedId: state.selectedId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteMemo: (id) => dispatch({type: 'DELETE_MEMO', memoId: id}),
    onSelectMemo: (title, content) => dispatch({type: 'SELECT_MEMO', memoTitle: title, memoContent: content}),
    onToggleModal: () => dispatch({type: 'TOGGLE_MODAL'}),
    onStoreId: (id) => dispatch({type: 'STORE_ID', memoId: id})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memos);