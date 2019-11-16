import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
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
          Button } from '@material-ui/core';

// Modal is same as Dialog

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing.unit * 1.5,
      margin: theme.spacing.unit * 0.5,
      paddingRight: theme.spacing.unit * 0.5,
      paddingLeft: theme.spacing.unit * 0.5
    },
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});

class Modal extends Component {

  state = {
    db: null,
    showInnerModal: false
  };

  componentDidMount() {
    // Set up Firebase config for connecting to the db.
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

  toggle = () => {
    this.props.onToggleModal();
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

  colorSelected(event) {
    this.changeColor(event.target.value);
  }

  changeColor = (color) => {
    this.props.onChangeColor(color, this.state.db);
  }

  // First deletion button is clicked -> Open final deletion modal for confirmation 
  OuterDeleteBtnClicked = () => {
    this.setState({ 
      showInnerModal: true
    });
  }

  updateMemoClicked = () => {
    this.toggle();
    this.updateMemo();
  }

  updateMemo = () => {
    this.props.onUpdateMemo(this.state.db);
  }

  innerModalToggle = () => {
    this.setState(state => ({ 
      showInnerModal: !state.showInnerModal
    }));
  }

  // Really delete the memo
  innerDeleteBtnClicked = () => {
    this.innerModalToggle();  // Close inner modal/ Close the final modal
    this.toggle();  // Close outer modal/ Close the first modal
    this.deleteMemo();  // Delete the memo on Firebase
  }

  // Delete the memo on Firebase
  deleteMemo = () => {
    this.props.onDeleteMemo(this.props.selectedId, this.state.db)
  }

  archiveMemo = () => {
    this.toggle();
    this.props.onArchiveMemo(this.state.db);
  }

  unarchiveMemo = () => {
    this.toggle();
    this.props.onUnarchiveMemo(this.state.db);
  }

  render() {

    let atLeastOneInputHasValue = this.state.hasTitle || this.state.hasContent;

    const { classes } = this.props;

    return (
      <>
        <Dialog
            open={this.props.showModal}
            onClose={this.toggle}
            fullWidth
            maxWidth="sm"
          >
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
            <DialogActions>
              { this.props.isMemoArchived ? 
                (
                  <Button
                    onClick={this.unarchiveMemo}
                    variant="text"
                    color="default"
                    className={classes.button}>
                    UNARCHIVE
                  </Button>
                ) : 
                (
                  <Button
                    onClick={this.archiveMemo}
                    variant="text"
                    color="default"
                    className={classes.button}>
                    ARCHIVE
                  </Button>
                )
              }
              <Button 
                onClick={this.OuterDeleteBtnClicked} 
                variant="outlined" 
                color="primary" 
                className={classes.button}>
                DELETE
              </Button>
              <Button 
                onClick={this.updateMemoClicked} 
                variant="contained" 
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
            <DialogTitle id="alert-dialog-title">{"Delete this memo?"}</DialogTitle>
            <DialogActions>
              <Button 
                onClick={this.innerModalToggle} 
                variant="text" 
                color="primary">
                CANCEL
              </Button>
              <Button 
                onClick={this.innerDeleteBtnClicked} 
                variant="outlined" 
                color="secondary" 
                className={classes.button}>
                DELETE
              </Button>
            </DialogActions>
          </Dialog>
      </>
    );
  }
}

export const mapStateToProps = state => {
  return {    
    showModal: state.showModal,
    selectedMemoTitle: state.selectedMemoTitle,
    selectedMemoContent: state.selectedMemoContent,
    selectedMemoColor: state.selectedMemoColor,
    selectedId: state.selectedId,
    isMemoArchived: state.isMemoArchived
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onDeleteMemo: (id, db) => dispatch({ type: 'DELETE_MEMO', memoId: id, firebaseDb: db }),
    onToggleModal: () => dispatch({ type: 'TOGGLE_MODAL' }),
    onChangeTitle: (title) => dispatch({ type: 'CHANGE_TITLE', memoTitle: title }),
    onChangeContent: (content) => dispatch({ type: 'CHANGE_CONTENT', memoContent: content }),
    onUpdateMemo: (db) => dispatch({ type: 'UPDATE_MEMO', firebaseDb: db }),
    onChangeColor: (color, db) => dispatch({ type: 'CHANGE_COLOR', memoColor: color, firebaseDb: db }),
    onArchiveMemo: (db) => dispatch({ type:'ARCHIVE_MEMO', firebaseDb: db}),
    onUnarchiveMemo: (db) => dispatch({ type: 'UNARCHIVE_MEMO', firebaseDb: db })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Modal));