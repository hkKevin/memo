import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar,
          Toolbar,
          IconButton,
          Typography,
          TextField,
          Tooltip } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/CancelOutlined';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';

import './FilteredMemos.css';
import * as actions from '../../store/actions/index';
import Toast from '../../components/UI/Toast/Toast';
import Modal from '../../components/UI/Modal/Modal';

const styles = theme => ({
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 9,
    marginBottom: -theme.spacing.unit * 9
  },
  colorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 10,
    marginBottom: -theme.spacing.unit * 10,
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
    marginLeft: -12
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
  },
  clearIcon: {
    marginRight: -12
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
    this.props.onSearch();
    this.generateAddedMemos();
  }

  generateAddedMemos = () => {
    if (this.props.addedMemos.length > 0) {

      let filteredMemos = ""
      if ( !this.props.searchingMemo ) {
        // Filtered memos by color
        filteredMemos = this.props.addedMemos.filter(memo => memo.color === this.props.filterColor);
      } else {
        // Filtered memos by text
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

  // One of the color is clicked
  colorClicked = (filterColor) => {
    this.props.onFilterMemos(filterColor);  // Pass the filter color to Redux
    this.setState({ searchedWord: "" }); // Clear the search text
  }

  clearFilterClicked = () => {
    // Remove all filters
    this.setState({ searchedWord: "" });
    this.props.onClearFilter();
  }

	render() {

    const { classes } = this.props;

    let filterControl = null;
    filterControl = (
      <>
        <div className={classes.searchContainer}>
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
        <div className={classes.colorContainer}>
          <Tooltip title="Blue">
            <div 
              className="findColor colorBlue"
              onClick={() => this.colorClicked("BLUE")}></div>
          </Tooltip>
          <Tooltip title="Green">
            <div 
              className="findColor colorGreen"
              onClick={() => this.colorClicked("GREEN")}></div>
          </Tooltip>
          <Tooltip title="Orange">
            <div 
              className="findColor colorOrange"
              onClick={() => this.colorClicked("ORANGE")}></div>
          </Tooltip>
          <Tooltip title="Pink">
            <div 
              className="findColor colorPink"
              onClick={() => this.colorClicked("PINK")}></div>
          </Tooltip>
          <Tooltip title="Purple">
            <div 
              className="findColor colorPurple"
              onClick={() => this.colorClicked("PURPLE")}></div>
          </Tooltip>
          <Tooltip title="Yellow">
            <div 
              className="findColor colorYellow"
              onClick={() => this.colorClicked("YELLOW")}></div>
          </Tooltip>
        </div>
      </>
      
    );
    
		return (
			<div>
        <AppBar color="inherit" position="fixed">
          <Toolbar>
            <IconButton 
              onClick={() => this.props.history.goBack()} 
              className={classes.menuButton} 
              aria-label="Menu">
              <ArrowBack color="primary" />
            </IconButton>
            <Tooltip title="Scroll to top">
              <Typography 
                id="appTitle"
                className={classes.title}
                onClick={this.titleClicked}
                variant="h6" 
                color="primary">
                Filter
              </Typography>
            </Tooltip>
            <Tooltip title="Clear filter">
              <IconButton 
                color="primary"
                className={classes.clearIcon}
                onClick={this.clearFilterClicked}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* {this.props.searchingMemo ? (searchField) : null} */}

        {filterControl}
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
    onFetchMemos: () => dispatch(actions.fetchMemos()),
    onFilterMemos: (filterColor) => dispatch({ type: 'FILTER_MEMOS', filterColor: filterColor }),
    onSearch: () => dispatch({ type: 'SEARCH_MEMO' }),
    onClearFilter: () => dispatch({ type: 'CLEAR_FILTER' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilteredMemos));
