import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, Button, Input, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import Radium, { StyleRoot } from 'radium';
import firebase from 'firebase';

import Memo from '../../components/Memo/Memo';
import AddMemo from '../../containers/AddMemo/AddMemo';
import './Memos.css';
import * as actions from '../../store/actions/index';

class Memos extends Component {

  constructor(props) {
    super(props);

    this.btnDropdownToggle = this.btnDropdownToggle.bind(this);
    this.btnDropdownSelect = this.btnDropdownSelect.bind(this);
    this.state = {
      hasTitle: false,
      hasContent: false,
      dropdownOpen: false,
      db: null
    };
  }  

  componentDidMount(){
    // console.log(this.props.addedMemos)
    this.props.onFetchMemos();

    // Set up Firebase config here once, for connecting to the db.
    var config = {
      apiKey: 'AIzaSyDgZKmgW7LpUpJmHkMpF0II4AcfHyfZFuo',
      authDomain: 'memo-a117b.firebaseapp.com',
      databaseURL: 'https://memo-a117b.firebaseio.com/'
    };
    firebase.initializeApp(config);
    // const db = firebase.database();
    this.setState({db: firebase.database()});
  }

  btnDropdownToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  btnDropdownSelect(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
    this.changeColor(event.target.innerText);
  }

  memoClicked = (memo) => {
    this.toggle();
    this.selectMemo(memo);
    this.storeId(memo);
    this.storeColor(memo);
  }

  deleteBtnClicked = () => {
    this.toggle();
    this.deleteMemo();
  }

  deleteMemo = () => {
    this.props.onDeleteMemo(this.props.selectedId, this.state.db)
  }

  toggle = () => {
    this.props.onToggleModal();
	}

  selectMemo = (memo) => {
    this.checkInput(memo);
    this.props.onSelectMemo(memo.title, memo.content)
  }

  checkInput = (memo) => {
    if (memo.title === null || memo.title === '') {
      this.setState({hasTitle: false});
    } else {
      this.setState({hasTitle: true});
    }

		if (memo.content === null || memo.content === '') {
      this.setState({hasContent: false});
    } else {
      this.setState({hasContent: true});
    }
	}

  storeId = (memo) => {
    this.props.onStoreId(memo.id)
  }

  titleChangedHandler = (event) => {
		if (event.target.value === null || event.target.value === '') {
			this.setState({hasTitle: false});
		} else {
			this.setState({hasTitle: true});
		}
    this.props.onChangeTitle(event.target.value);
	}

	contentChangedHandler = (event) => {
		if (event.target.value === null || event.target.value === '') {
			this.setState({hasContent: false});
		} else {
			this.setState({hasContent: true});
		}
    this.props.onChangeContent(event.target.value);
  }

  updateMemoClicked = () => {
    this.toggle();
    this.updateMemo();
  }

  updateMemo = () => {
    this.props.onUpdateMemo(this.state.db);
  }

  storeColor = (memo) => {
    this.props.onStoreColor(memo.color)
  }

  changeColor = (color) => {
    this.props.onChangeColor(color, this.state.db);
  }

  render () {
    let atLeastOneInputHasValue = this.state.hasTitle || this.state.hasContent;
    
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
                rows='10' 
                placeholder='Content'
                className='textArea' />
            </ModalBody>
            <ModalFooter className='modalFooter'>
              <Button 
                outline
                color="danger" 
                onClick={this.deleteBtnClicked}>DELETE</Button>
              <Button 
                outline
                color="secondary" 
                onClick={this.toggle}
                title='Cancel update'>CANCEL</Button>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen} 
                toggle={this.btnDropdownToggle}>
                <DropdownToggle caret outline color="info">
                  COLOR
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem 
                    onClick={this.btnDropdownSelect} 
                    className='DropdownItem' 
                    id='blueItem'>BLUE</DropdownItem><DropdownItem divider />
                  <DropdownItem 
                    onClick={this.btnDropdownSelect} 
                    className='DropdownItem' 
                    id='greenItem'>GREEN</DropdownItem><DropdownItem divider />
                  <DropdownItem 
                    onClick={this.btnDropdownSelect} 
                    className='DropdownItem' 
                    id='orangeItem'>ORANGE</DropdownItem><DropdownItem divider />
                  <DropdownItem 
                    onClick={this.btnDropdownSelect} 
                    className='DropdownItem' 
                    id='pinkItem'>PINK</DropdownItem><DropdownItem divider />
                  <DropdownItem 
                    onClick={this.btnDropdownSelect} 
                    className='DropdownItem' 
                    id='purpleItem'>PURPLE</DropdownItem><DropdownItem divider />
                  <DropdownItem 
                    onClick={this.btnDropdownSelect} 
                    className='DropdownItem' 
                    id='yellowItem'>YELLOW</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <Button 
                outline
                color="primary" 
                onClick={this.updateMemoClicked}
                disabled={!atLeastOneInputHasValue}
                className='updateBtn'>UPDATE</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    } 


    return (
      <StyleRoot>
        <div>
          <AddMemo />

          {this.props.addedMemos
            ? (
              this.props.addedMemos.map(memo => (
                <Memo 
                  key={memo.id}
                  title={memo.title} 
                  content={memo.content} 
                  clicked={() => this.memoClicked(memo)}
                  color={memo.color}/>
              ))
            )
            : 'Memos not found!'}

          {modal}
        </div>
      </StyleRoot>
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
    onDeleteMemo: (id, db) => dispatch({type: 'DELETE_MEMO', memoId: id, firebaseDb: db}),
    onSelectMemo: (title, content) => dispatch({type: 'SELECT_MEMO', memoTitle: title, memoContent: content}),
    onToggleModal: () => dispatch({type: 'TOGGLE_MODAL'}),
    onStoreId: (id) => dispatch({type: 'STORE_ID', memoId: id}),
    onChangeTitle: (title) => dispatch({type: 'CHANGE_TITLE', memoTitle: title}),
    onChangeContent: (content) => dispatch({type: 'CHANGE_CONTENT', memoContent: content}),
    onUpdateMemo: (db) => dispatch({type: 'UPDATE_MEMO', firebaseDb: db}),
    onStoreColor: (color) => dispatch({type: 'STORE_COLOR', memoColor: color}),
    onChangeColor: (color, db) => dispatch({type: 'CHANGE_COLOR', memoColor: color, firebaseDb: db}),
    onFetchMemos: () => dispatch(actions.fetchMemos())
  };
};

export default Radium(connect(mapStateToProps, mapDispatchToProps)(Memos));