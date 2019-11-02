import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar,
          Toolbar,
          IconButton,
          Typography,
          TextField } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';

import './FilteredMemos.css';
import * as actions from '../../store/actions/index';
import Toast from '../../components/UI/Toast/Toast';
import Modal from '../../components/UI/Modal/Modal';

const styles = theme => ({
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 9,
    marginBottom: -theme.spacing.unit * 9
  },
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
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 220,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20
  }
});

class FilteredMemos extends Component {

	constructor(props) {
    super(props);
    this.state = {
      hasTitle: false,
      hasContent: false,
      dropdownOpen: false,
      memoStyle: {
        'YELLOW': {
          border: '1px solid #feef9c',
          backgroundColor: '#feef9c'
        },
        'PURPLE': {
          border: '1px solid #dcdfff',
          backgroundColor: '#dcdfff'
        },
        'ORANGE': {
          border: '1px solid #feccaf',
          backgroundColor: '#feccaf'
        },
        'GREEN': {
          border: '1px solid #b1ffb1',
          backgroundColor: '#b1ffb1'
        },
        'BLUE': {
          border: '1px solid #d8f1ff',
          backgroundColor: '#d8f1ff'
        },
        'PINK': {
          border: '1px solid #feb0bc',
          backgroundColor: '#feb0bc'
        }
      },
      searchedWord: ""
    };
  }

  memoClicked = (memo) => {
    this.toggle();
    this.selectMemo(memo);
    this.storeId(memo);
    this.storeColor(memo);
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

  storeColor = (memo) => {
    this.props.onStoreColor(memo.color)
  }

  searchOnChange = (event) => {
    this.setState({
      searchedWord: event.target.value
    });
  }

  generateAddedMemos = () => {
    if (this.props.addedMemos.length > 0) {

      let filteredMemos = ""
      if ( !this.props.searchingMemo ) {
        // Show filtered memos
        filteredMemos = this.props.addedMemos.filter(memo => memo.color === this.props.filterColor);
      } else {
        // Show memos that contain searched word
        filteredMemos = this.props.addedMemos.filter(
          memo => memo.title.toLowerCase().includes(this.state.searchedWord.toLowerCase()) || 
                  memo.content.toLowerCase().includes(this.state.searchedWord.toLowerCase())
        );
      }
      
      return filteredMemos.map(memo => (
        <div
          key={memo.id}
          onDoubleClick={() => this.memoClicked(memo)}
          style={this.state.memoStyle[memo.color]}
          className='filteredMemo'
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

  // When web app title is clicked, scroll to top
  titleClicked = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

	render() {

    const { classes } = this.props;

    let searchField = null;
    searchField = (
      <div className={classes.paperContainer}>
        <TextField
          id="standard-search"
          key="searchField"
          name="searchField"
          label="Find..."
          type="search"
          className={classes.textField}
          margin="normal"
          autoFocus
          onChange={this.searchOnChange}
          value={this.state.searchedWord}
        />
      </div>
    );
    
		return (
			<div>
        <AppBar color="default" position="fixed">
          <Toolbar>
            <IconButton 
              onClick={() => this.props.history.goBack()} 
              className={classes.menuButton} 
              aria-label="Menu">
              <ArrowBack color="primary" />
            </IconButton>
            <Typography 
              id="appTitle"
              className={classes.title}
              onClick={this.titleClicked}
              variant="h6" 
              color="primary">
              Memo
            </Typography>
          </Toolbar>
        </AppBar>

        {this.props.searchingMemo ? (searchField) : null}

        {this.props.memosFetched
          ?
          (
          <div className="filteredLayout">
            {this.generateAddedMemos()}
          </div>
          )
          : null
        }

        {this.props.showStoredMemo ? <Modal /> : null}
        
        <Toast toastMsg={this.props.toastMsg} />
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
    addedMemos: state.memos,
    tempMemos: state.tempMemos,
    showStoredMemo: state.showStoredMemo,
    showAllMemos: state.showAllMemos,
    memosFetched: state.memosFetched,
    filterColor: state.filterColor,
    draggable: state.draggable,
    searchingMemo: state.searchingMemo,
    toastMsg: state.toastMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectMemo: (title, content) => dispatch({ type: 'SELECT_MEMO', memoTitle: title, memoContent: content }),
    onToggleModal: () => dispatch({ type: 'TOGGLE_MODAL' }),
    onStoreId: (id) => dispatch({ type: 'STORE_ID', memoId: id }),
    onStoreColor: (color) => dispatch({ type: 'STORE_COLOR', memoColor: color }),
    onFetchMemos: () => dispatch(actions.fetchMemos())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilteredMemos));
