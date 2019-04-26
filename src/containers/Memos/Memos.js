import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { WidthProvider, Responsive } from "react-grid-layout";
import { withStyles } from '@material-ui/core/styles';
import { MenuItem, 
          Select, 
          InputLabel, 
          FormControl, 
          Dialog, 
          DialogTitle,
          DialogActions, 
          DialogContent,
          TextField, 
          Button,
          CircularProgress } from '@material-ui/core';

import * as actions from '../../store/actions/index';
import AddMemo from '../../containers/AddMemo/AddMemo';
import SideMenu from '../../components/UI/SideMenu/SideMenu';
import './Memos.css';

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
  },
  progress: {
    marginTop: theme.spacing.unit * 20,
  },
  paper: {
    margin: 0
  }
});

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Memos extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.state = {
      hasTitle: false,
      hasContent: false,
      dropdownOpen: false,
      db: null,
      layouts: getFromLS('layouts'),
      memoStyle: {
        'YELLOW': {
          border: '1px solid #feef9c',
          borderRadius: '3px',
          backgroundColor: '#feef9c',
          padding: '1rem',
          boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
          display: 'block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            // boxShadow: '5px 5px 5px #ccc'
            boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
          },
          ':active': {
            // boxShadow: '10px 10px 10px #ccc'
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
          },
          '@media only screen and (maxWidth: 500px)': {
            // margin: '20px 20px',
            padding: '5px',
            display: 'block'
          }
        },
        'PURPLE': {
          border: '1px solid #dcdfff',
          borderRadius: '3px',
          backgroundColor: '#dcdfff',
          padding: '1rem',
          boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
          display: 'block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
          },
          ':active': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
          },
          '@media (maxWidth: 500px)': {
            margin: '20px 20px',
            display: 'block'
          }
        },
        'ORANGE': {
          border: '1px solid #feccaf',
          borderRadius: '3px',
          backgroundColor: '#feccaf',
          padding: '1rem',
          boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
          display: 'block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
          },
          ':active': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
          },
          '@media (maxWidth: 500px)': {
            margin: '20px 20px',
            display: 'block'
          }
        },
        'GREEN': {
          border: '1px solid #b1ffb1',
          borderRadius: '3px',
          backgroundColor: '#b1ffb1',
          padding: '1rem',
          boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
          display: 'block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
          },
          ':active': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
          },
          '@media (maxWidth: 500px)': {
            margin: '20px 20px',
            display: 'block'
          }
        },
        'BLUE': {
          border: '1px solid #d8f1ff',
          borderRadius: '3px',
          backgroundColor: '#d8f1ff',
          padding: '1rem',
          boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
          display: 'block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
          },
          ':active': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
          },
          '@media (maxWidth: 500px)': {
            margin: '20px 20px',
            display: 'block'
          }
        },
        'PINK': {
          border: '1px solid #feb0bc',
          borderRadius: '3px',
          backgroundColor: '#feb0bc',
          padding: '1rem',
          boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
          display: 'block',
          textAlign: 'left',
          maxWidth: '800px',
          maxHeight: '800px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          ':hover': {
            cursor: 'pointer',
            boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)'
          },
          ':active': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
          },
          '@media (maxWidth: 500px)': {
            margin: '20px 20px',
            display: 'block'
          }
        }
      },
      showInnerModal: false
    };
  }

  componentWillMount() {
    this.props.onFetchMemos();
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

  onLayoutChange(layout, newLayout) {
      saveToLS("layouts", newLayout);
      this.setState({ layouts: newLayout })
  }

  colorSelected(event) {
    this.changeColor(event.target.value);
  }

  memoClicked = (memo) => {
    this.toggle();
    this.selectMemo(memo);
    this.storeId(memo);
    this.storeColor(memo);
  }

  OuterDeleteBtnClicked = () => {
    this.setState({ 
      showInnerModal: true
    });
  }

  // Really delete the memo
  innerDeleteBtnClicked = () => {
    this.innerModalToggle();  // Close inner modal
    this.toggle();  // Close outer modal
    this.deleteMemo();  // Delete the memo on Firebase
  }

  // Delete the memo on Firebase
  deleteMemo = () => {
    this.props.onDeleteMemo(this.props.selectedId, this.state.db)
  }

  toggle = () => {
    this.props.onToggleModal();
  }

  innerModalToggle = () => {
    this.setState(state => ({ 
      showInnerModal: !state.showInnerModal
    }));
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

  generateAddedMemos = () => {
    if (this.props.addedMemos.length > 0) {
      return this.props.addedMemos.map(memo => (
        <div
          key={memo.id}
          onDoubleClick={() => this.memoClicked(memo)}
          style={this.state.memoStyle[memo.color]}
          className='memo'
          data-grid={{ x: 0, y: 0, w: 3, h: 5 }}
        >

          <h3>{memo.title}</h3>
          <hr />
          <div>{memo.content}</div>
          {this.props.draggable
            ? <i className="material-icons dragHandle">drag_handle</i>
            : null}
        </div>

      ));
    } else {
      console.error('no firebase widgets available yet.');
      return <div>Loading...</div>;
    }
  }


  render() {

    let atLeastOneInputHasValue = this.state.hasTitle || this.state.hasContent;
    
    const { classes } = this.props;

    let dialog = null;
    if (this.props.showStoredMemo) {

      dialog = (
        <div>
          <Dialog
            open={this.props.showModal}
            onClose={this.toggle}
            fullWidth
            maxWidth="sm"
            className={classes.paper}
          >
            {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
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
                value={this.props.selectedMemoTitle}
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
                value={this.props.selectedMemoContent}
              />

              <FormControl 
                required 
                className={classes.formControl}>
                <InputLabel>Color</InputLabel>
                  <Select
                    value={this.props.selectedMemoColor}
                    onChange={(event) => this.colorSelected(event)}
                    name="color"
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="BLUE">Blue</MenuItem>
                    <MenuItem value="GREEN">Green</MenuItem>
                    <MenuItem value="ORANGE">Orange</MenuItem>
                    <MenuItem value="PINK">Pink</MenuItem>
                    <MenuItem value="PURPLE">Purple</MenuItem>
                    <MenuItem value="YELLOW">Yellow</MenuItem>
                  </Select>
              </FormControl>

            </DialogContent>
            <DialogActions className={classes.root}>
              <Button 
                onClick={this.OuterDeleteBtnClicked} 
                variant="text" 
                color="primary" 
                className={classes.button}>
                DELETE
              </Button>
              <Button 
                onClick={this.updateMemoClicked} 
                variant="text" 
                color="secondary" 
                className={classes.button} 
                disabled={!atLeastOneInputHasValue}>
                UPDATE
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.showInnerModal}
            onClose={this.innerModalToggle}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Really delete this memo?"}</DialogTitle>
            <DialogActions>
              <Button 
                onClick={this.innerModalToggle} 
                color="primary">
                CANCEL
              </Button>
              <Button 
                onClick={this.innerDeleteBtnClicked} 
                variant="text" 
                color="secondary" 
                className={classes.button}>
                DELETE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }


    return (
      <div>
        <SideMenu history={this.props.history} />
        <AddMemo />

        {this.props.memosFetched
          ? 
          <ResponsiveReactGridLayout
            className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={40}
            layouts={this.state.layouts}
            onLayoutChange={(layout, newLayout) =>
              this.onLayoutChange(layout, newLayout)
            }
            isDraggable={this.props.draggable}
          >
            {this.generateAddedMemos()}
          </ResponsiveReactGridLayout>
          : (<CircularProgress color="secondary" className={classes.progress} />)
        }

        {dialog}
      </div>
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
      return { lg: [{ x: 0, y: 0, w: 4, h: 4, minW: 4, maxW: 8 }] };
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
    selectedMemoColor: state.selectedMemoColor,
    showStoredMemo: state.showStoredMemo,
    showAllMemos: state.showAllMemos,
    selectedId: state.selectedId,
    memosFetched: state.memosFetched,
    filterColor: state.filterColor,
    draggable: state.draggable
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Memos));