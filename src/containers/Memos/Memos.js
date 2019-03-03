import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalFooter, Button, Input, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import Radium, { StyleRoot } from 'radium';
import firebase from 'firebase';
//
import { WidthProvider, Responsive } from "react-grid-layout";

import AddMemo from '../../containers/AddMemo/AddMemo';
import './Memos.css';
import * as actions from '../../store/actions/index';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Memos extends React.PureComponent {

  constructor(props) {
    super(props);

    this.btnDropdownToggle = this.btnDropdownToggle.bind(this);
    this.btnDropdownSelect = this.btnDropdownSelect.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.state = {
      hasTitle: false,
      hasContent: false,
      dropdownOpen: false,
      db: null,
      layouts: getFromLS('layouts'),
      dragMode: false,
      memoStyle: {
        'YELLOW': {
          border: '1px solid #feef9c',
          backgroundColor: '#feef9c',
          // padding: '0px',
          padding: '30px',
          // margin: '10px 10px',
          boxShadow: '3px 3px 2px #ccc',
          boxSizing: 'border-box',
          display: 'block',
          // display: 'inline-block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            boxShadow: '5px 5px 5px #ccc'
          },
          ':active': {
            boxShadow: '10px 10px 10px #ccc'
          },
          '@media (maxWidth: 500px)': {
            margin: '20px 20px',
            display: 'block'
          }
        },
        'PURPLE': {
          border: '1px solid #DCDFFF',
          backgroundColor: '#DCDFFF',
          padding: '30px',
          // margin: '10px 10px',
          boxShadow: '3px 3px 2px #ccc',
          boxSizing: 'border-box',
          display: 'block',
          // display: 'inline-block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            boxShadow: '5px 5px 5px #ccc'
          },
          ':active': {
            boxShadow: '10px 10px 10px #ccc'
          },
          '@media (maxWidth: 500px)': {
            margin: '20px 20px',
            display: 'block'
          }
        },
        'ORANGE': {
          border: '1px solid #feccaf',
          backgroundColor: '#feccaf',
          padding: '30px',
          // margin: '10px 10px',
          boxShadow: '3px 3px 2px #ccc',
          boxSizing: 'border-box',
          display: 'block',
          // display: 'inline-block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            boxShadow: '5px 5px 5px #ccc'
          },
          ':active': {
            boxShadow: '10px 10px 10px #ccc'
          },
          '@media (maxWidth: 500px)': {
            margin: '20px 20px',
            display: 'block'
          }
        },
        'GREEN': {
          border: '1px solid #b1ffb1',
          backgroundColor: '#b1ffb1',
          padding: '30px',
          // margin: '10px 10px',
          boxShadow: '3px 3px 2px #ccc',
          boxSizing: 'border-box',
          display: 'block',
          // display: 'inline-block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            boxShadow: '5px 5px 5px #ccc'
          },
          ':active': {
            boxShadow: '10px 10px 10px #ccc'
          },
          '@media (maxWidth: 500px)': {
            margin: '20px 20px',
            display: 'block'
          }
        },
        'BLUE': {
          border: '1px solid #d8f1ff',
          backgroundColor: '#d8f1ff',
          padding: '30px',
          // margin: '10px 10px',
          boxShadow: '3px 3px 2px #ccc',
          boxSizing: 'border-box',
          display: 'block',
          // display: 'inline-block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            boxShadow: '5px 5px 5px #ccc'
          },
          ':active': {
            boxShadow: '10px 10px 10px #ccc'
          },
          '@media (maxWidth: 500px)': {
            margin: '20px 20px',
            display: 'block'
          }
        },
        'PINK': {
          border: '1px solid #feb0bc',
          backgroundColor: '#feb0bc',
          padding: '30px',
          // margin: '10px 10px',
          boxShadow: '3px 3px 2px #ccc',
          boxSizing: 'border-box',
          display: 'block',
          // display: 'inline-block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            boxShadow: '5px 5px 5px #ccc'
          },
          ':active': {
            boxShadow: '10px 10px 10px #ccc'
          },
          '@media (maxWidth: 500px)': {
            margin: '20px 20px',
            display: 'block'
          }
        }
      }
    };
    console.log(this.state.layouts);
  }

  componentWillMount() {
    console.log('componentWillMount');
    console.log(this.state.layouts);
    this.props.onFetchMemos();
  }

  componentDidMount() {
    console.log('componentDidMount');
    console.log(this.state.layouts); // layout is correct here

    // Set up Firebase config here once, for connecting to the db.
    var config = {
      apiKey: 'AIzaSyDgZKmgW7LpUpJmHkMpF0II4AcfHyfZFuo',
      authDomain: 'memo-a117b.firebaseapp.com',
      databaseURL: 'https://memo-a117b.firebaseio.com/'
    };
    firebase.initializeApp(config);
    this.setState({ db: firebase.database() });

  }

  onLayoutChange(layout, newLayout) {
    console.log('onLayoutChange');
    console.log(this.state.layouts); // correct first time

    console.log(layout); // missing the firebase widget here

    saveToLS("layouts", newLayout);
    this.setState({ layouts: newLayout });
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
      this.setState({ hasTitle: false });
    } else {
      this.setState({ hasTitle: true });
    }

    if (memo.content === null || memo.content === '') {
      this.setState({ hasContent: false });
    } else {
      this.setState({ hasContent: true });
    }
  }

  storeId = (memo) => {
    this.props.onStoreId(memo.id)
  }

  titleChangedHandler = (event) => {
    if (event.target.value === null || event.target.value === '') {
      this.setState({ hasTitle: false });
    } else {
      this.setState({ hasTitle: true });
    }
    this.props.onChangeTitle(event.target.value);
  }

  contentChangedHandler = (event) => {
    if (event.target.value === null || event.target.value === '') {
      this.setState({ hasContent: false });
    } else {
      this.setState({ hasContent: true });
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

  dragModeToggle = () => {
    this.setState(prevState => ({ 
      dragMode: !prevState.dragMode
    }));
  }



  generateAddedMemos = () => {
    console.log('generateAddedMemos');
    console.log(this.props.addedMemos);
    if (this.props.addedMemos.length > 0) {
      return this.props.addedMemos.map(memo => (
        <div
          key={memo.id}
          onDoubleClick={() => this.memoClicked(memo)}
          style={this.state.memoStyle[memo.color]}
          className='memo'
          data-grid={{ x: 0, y: 0, w: 4, h: 7 }}
        >

          <h3>{memo.title}</h3>
          <hr />
          <div>{memo.content}</div>
          {this.state.dragMode
            ? <div className='dragHandle'></div>
            : null}
        </div>


      ));
    } else {
      console.error('no firebase widgets available yet.');
      return <div>loading...</div>;
    }
  }


  render() {
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
      // <StyleRoot>
      <div>
        <AddMemo />

        <div className='dragMode'>
          <i 
            className="fas fa-grip-lines"
            onClick={this.dragModeToggle}
            title='Toggle Drag Mode'></i>
        </div>

        {this.props.memosFetched
          ?
          <ResponsiveReactGridLayout
            className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 1 }}
            rowHeight={40}
            layouts={this.state.layouts}
            onLayoutChange={(layout, newLayout) =>
              this.onLayoutChange(layout, newLayout)
            }
            isDraggable={this.state.dragMode}
          >

            {this.generateAddedMemos()}
          </ResponsiveReactGridLayout>
          : null
        }

        {modal}
      </div>
      // </StyleRoot>
    );
  }
}

export const emptyObject = (data) => {
  let isEmpty = true;

  if (data && data !== 'undefined' && data !== null) {
    isEmpty = Object.keys(data).length === 0 && data.constructor === Object;
  }

  return isEmpty;
}

function getFromLS(layoutName) {
  if (global.localStorage) {
    let savedLayout = global.localStorage.getItem(layoutName);
    if (savedLayout && !emptyObject(savedLayout)) {
      return JSON.parse(savedLayout).layouts;
    } else {
      return { lg: [{ x: 0, y: 0, w: 4, h: 4, minW: 4, maxW: 8 }] }; // Not sure how to construct defaultLayout for dynamic numbers of memos
    }
  }
}

export function saveToLS(layoutName, value) {
  if (global.localStorage) {
    global.localStorage.setItem(layoutName, JSON.stringify({ layouts: value }));
  } else {
    console.error('localStorage is not supported');
  }
}

export const mapStateToProps = state => {
  return {
    showModal: state.showModal,
    addedMemos: state.memos,
    tempMemos: state.tempMemos,
    selectedMemoTitle: state.selectedMemoTitle,
    selectedMemoContent: state.selectedMemoContent,
    showStoredMemo: state.showStoredMemo,
    selectedId: state.selectedId,
    memosFetched: state.memosFetched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteMemo: (id, db) => dispatch({ type: 'DELETE_MEMO', memoId: id, firebaseDb: db }),
    onSelectMemo: (title, content) => dispatch({ type: 'SELECT_MEMO', memoTitle: title, memoContent: content }),
    onToggleModal: () => dispatch({ type: 'TOGGLE_MODAL' }),
    onStoreId: (id) => dispatch({ type: 'STORE_ID', memoId: id }),
    onChangeTitle: (title) => dispatch({ type: 'CHANGE_TITLE', memoTitle: title }),
    onChangeContent: (content) => dispatch({ type: 'CHANGE_CONTENT', memoContent: content }),
    onUpdateMemo: (db) => dispatch({ type: 'UPDATE_MEMO', firebaseDb: db }),
    onStoreColor: (color) => dispatch({ type: 'STORE_COLOR', memoColor: color }),
    onChangeColor: (color, db) => dispatch({ type: 'CHANGE_COLOR', memoColor: color, firebaseDb: db }),
    onFetchMemos: () => dispatch(actions.fetchMemos())
  };
};


export default Radium(connect(mapStateToProps, mapDispatchToProps)(Memos));