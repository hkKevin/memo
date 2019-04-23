import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, Button, Input, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { connect } from 'react-redux';
import { WidthProvider, Responsive } from "react-grid-layout";
import firebase from 'firebase';

import './FilteredMemos.css';
import * as actions from '../../store/actions/index';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class FilteredMemos extends Component {

	constructor(props) {
    super(props);

    this.btnDropdownToggle = this.btnDropdownToggle.bind(this);
    this.btnDropdownSelect = this.btnDropdownSelect.bind(this);
    // this.onLayoutChange = this.onLayoutChange.bind(this);
    this.state = {
      hasTitle: false,
      hasContent: false,
      dropdownOpen: false,
      db: null,
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
    // console.log(this.state.layouts);
  }

  componentDidMount() {
    // Set up Firebase config here once, for connecting to the db.
    var config = {
      apiKey: 'AIzaSyDgZKmgW7LpUpJmHkMpF0II4AcfHyfZFuo',
      authDomain: 'memo-a117b.firebaseapp.com',
      databaseURL: 'https://memo-a117b.firebaseio.com/'
    };
    // Prevent duplicate firebase app
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    // firebase.initializeApp(config);
    this.setState({ db: firebase.database() });
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
    let outputMemos = "";
    // console.log('generateAddedMemos');
    console.log(this.props.addedMemos);
    if (this.props.addedMemos.length > 0) {
      // if (this.props.showAllMemos === true) {
      //   // Show all of the memos
      //   outputMemos = this.props.addedMemos;
      // } else {
      //   // Show filtered memos
      //   outputMemos = this.props.addedMemos.filter(memo => memo.color === this.props.filterColor);
      // }

      // Show filtered memos
      outputMemos = this.props.addedMemos.filter(memo => memo.color === this.props.filterColor);

      return outputMemos.map(memo => (
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
                    id='blueItem'>BLUE</DropdownItem>
                  <DropdownItem
                    onClick={this.btnDropdownSelect}
                    className='DropdownItem'
                    id='greenItem'>GREEN</DropdownItem>
                  <DropdownItem
                    onClick={this.btnDropdownSelect}
                    className='DropdownItem'
                    id='orangeItem'>ORANGE</DropdownItem>
                  <DropdownItem
                    onClick={this.btnDropdownSelect}
                    className='DropdownItem'
                    id='pinkItem'>PINK</DropdownItem>
                  <DropdownItem
                    onClick={this.btnDropdownSelect}
                    className='DropdownItem'
                    id='purpleItem'>PURPLE</DropdownItem>
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
			<div>
				<div id='backBtn'>
					<i className="fas fa-arrow-circle-left"
						onClick={() => this.props.history.goBack()}
						data-tip='BACK'></i>
				</div>

        <div className='dragMode'>
          <i className="fas fa-grip-lines"
            onClick={this.dragModeToggle}
            data-tip='Toggle Drag Mode'></i>
        </div>

        {this.props.memosFetched
          ?
          <ResponsiveReactGridLayout
            className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 1 }}
            rowHeight={40}
            layouts={this.state.layouts}
            // onLayoutChange={(layout, newLayout) =>
            //   this.onLayoutChange(layout, newLayout)
            // }
            isDraggable={this.state.dragMode}
          >
            {this.generateAddedMemos()}
          </ResponsiveReactGridLayout>
          : null
        }

        {modal}
        {/* FilteredMemos page */}
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    showModal: state.showModal,
    addedMemos: state.memos,
    tempMemos: state.tempMemos,
    selectedMemoTitle: state.selectedMemoTitle,
    selectedMemoContent: state.selectedMemoContent,
    showStoredMemo: state.showStoredMemo,
    showAllMemos: state.showAllMemos,
    selectedId: state.selectedId,
    memosFetched: state.memosFetched,
    filterColor: state.filterColor
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
    // onFilterMemos: (filterColor) => dispatch({ type: 'FILTER_MEMOS', filterColor: filterColor }),
    // onResetFilter: () => dispatch({ type: 'RESET_FILTER' })
    // onFetchMemos: () => dispatch(actions.fetchMemos())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilteredMemos);
