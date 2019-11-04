import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { AppBar,
          Toolbar,
          IconButton,
          Typography,
          Tooltip,
          CircularProgress } from '@material-ui/core';
import { ArchiveOutlined } from '@material-ui/icons';
import ArrowBack from '@material-ui/icons/ArrowBack';

import * as actions from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';
import Toast from '../../components/UI/Toast/Toast';

const styles = theme => ({
  menuButton: {
    marginLeft: -12
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20
  },
  progress: {
    marginTop: theme.spacing.unit * 20,
  }
});

class ArchivedMemos extends Component {

  state = {
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
    }
  }

  componentWillMount () {
    this.props.onFetchMemos();
  }
  
  generateAddedMemos = () => {
    let archivedMemos = ""

    if (this.props.addedMemos.length > 0) {

      archivedMemos = this.props.addedMemos.filter(memo => memo.archived === true)
      
      return archivedMemos.map(memo => (
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
    } 
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

  // When web app title is clicked, scroll to top
  titleClicked = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  render() {
    
    const { classes } = this.props;

    // When No memos is archived
    let archiveEmpty = null
    if ( this.props.memosFetched && this.archivedMemos === "" ) {
      archiveEmpty = (
        <div className="memo-empty">
          <ArchiveOutlined 
            fontSize="large"
            color="disabled"
            className="memo-empty-icon" />
          <Typography
            variant="h6"
            color="textSecondary">
            Archived memos appear here
          </Typography>
        </div>
      );
    }

    return (
      <>
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
                Archive
              </Typography>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {archiveEmpty}

        {this.props.memosFetched
          ?
          (
          <div className="filteredLayout">
            {this.generateAddedMemos()}
          </div>
          )
          : (<CircularProgress color="secondary" className={classes.progress} />)
        }

        {this.props.showStoredMemo ? <Modal /> : null}

        <Toast toastMsg={this.props.toastMsg} />
      </>
    );
  };
}

export const mapStateToProps = state => {
  return {
    addedMemos: state.memos,
    memosFetched: state.memosFetched,
    showStoredMemo: state.showStoredMemo,
    toastMsg: state.toastMsg
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onSelectMemo: (title, content) => dispatch({ type: 'SELECT_MEMO', memoTitle: title, memoContent: content }),
    onToggleModal: () => dispatch({ type: 'TOGGLE_MODAL' }),
    onStoreId: (id) => dispatch({ type: 'STORE_ID', memoId: id }),
    onStoreColor: (color) => dispatch({ type: 'STORE_COLOR', memoColor: color }),
    onFetchMemos: () => dispatch(actions.fetchMemos())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ArchivedMemos));