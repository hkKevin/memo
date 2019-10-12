import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { ListItemSecondaryAction, 
          Typography, 
          Toolbar, 
          AppBar, 
          IconButton, 
          ListItemText, 
          ListItemIcon, 
          ListItem, 
          Divider, 
          List, 
          SwipeableDrawer, 
          Switch,
          Collapse,
          Fab,
          Icon } from '@material-ui/core';
import {  ColorLens, 
          Create, 
          DragHandle, 
          ExpandLess, 
          ExpandMore } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

import './SideMenu.css';

const styles = theme => ({
  fullList: {
    width: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  searchIcon: {
    marginRight: -12
  },
  nestedBlue: {
    paddingLeft: theme.spacing.unit * 5,
    backgroundColor: '#d8f1ff'
  },
  nestedGreen: {
    paddingLeft: theme.spacing.unit * 5,
    backgroundColor: '#b1ffb1'
  },
  nestedOrange: {
    paddingLeft: theme.spacing.unit * 5,
    backgroundColor: '#feccaf'
  },
  nestedPink: {
    paddingLeft: theme.spacing.unit * 5,
    backgroundColor: '#feb0bc'
  },
  nestedPurple: {
    paddingLeft: theme.spacing.unit * 5,
    backgroundColor: '#dcdfff'
  },
  nestedYellow: {
    paddingLeft: theme.spacing.unit * 5,
    backgroundColor: '#feef9c'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: theme.zIndex.tooltip
  }
});


class SideMenu extends Component {
  state = {
    menu: false,
    checked: false,
    openNestedList: false
  };

  dragToggleSwitched = event => {
    this.setState({ checked: !this.state.checked });

    if (event.target.checked === true) {
      // Drag mode ON
      this.props.onToggleDraggable(true);
    } else {
      // Drag mode OFF
      this.props.onToggleDraggable(false);
    }
  };

  closeDrawer = () => {
    this.setState({ menu: false });
  };

  openDrawer = () => {
    this.setState({ menu: true });
  };

  // Create new memo
  createOnClick = () => {
    this.closeDrawer();
    this.props.onCreateMemo();
  }

  // Open sub-list of colors to be filtered
  filterOnClick = () => {
    this.setState( state => ({
      openNestedList: !state.openNestedList
    }));
  }

  // One of the color is clicked
  colorClicked = (filterColor) => {
		this.props.history.push('/memo/filtered'); // Redirect to that path
    this.props.onFilterMemos(filterColor);  // Pass the filter color to Redux
    this.closeDrawer(); // Close the side menu
    this.setState({ openNestedList: false }); // Close sub-list of colors
    this.props.onToggleDraggable(false);  // Turn drag mode OFF
  }

  // Search icon is clicked
  searchClicked = () => {
    this.props.onSearch();  // Show all memos and ready to filter memos by text
    this.props.history.push('/memo/filtered'); // Redirect to that path
    this.props.onToggleDraggable(false);  // Turn drag mode OFF
  }

  render() {
    const { classes } = this.props;

    const fullList = (
      <div className={classes.fullList}>
        <List>
          <ListItem button onClick={this.filterOnClick}>
            <ListItemIcon>
              <ColorLens color="primary" />
            </ListItemIcon>
            <ListItemText primary="Filter by Color" />
            {this.state.openNestedList ? <ExpandLess color="secondary" /> : <ExpandMore color="secondary" />}
          </ListItem>
          <Collapse in={this.state.openNestedList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nestedBlue}>
                <ListItemText 
                  inset 
                  primary="Blue" 
                  onClick={() => this.colorClicked("BLUE")} />
              </ListItem>
              <ListItem button className={classes.nestedGreen}>
                <ListItemText 
                  inset 
                  primary="Green" 
                  onClick={() => this.colorClicked("GREEN")} />
              </ListItem>
              <ListItem button className={classes.nestedOrange}>
                <ListItemText 
                  inset 
                  primary="Orange" 
                  onClick={() => this.colorClicked("ORANGE")} />
              </ListItem>
              <ListItem button className={classes.nestedPink}>
                <ListItemText 
                  inset 
                  primary="Pink" 
                  onClick={() => this.colorClicked("PINK")} />
              </ListItem>
              <ListItem button className={classes.nestedPurple}>
                <ListItemText 
                  inset 
                  primary="Purple" 
                  onClick={() => this.colorClicked("PURPLE")} />
              </ListItem>
              <ListItem button className={classes.nestedYellow}>
                <ListItemText 
                  inset 
                  primary="Yellow" 
                  onClick={() => this.colorClicked("YELLOW")} />
              </ListItem>
            </List>
          </Collapse>

          <ListItem>
            <ListItemIcon>
              <DragHandle color="primary" />
            </ListItemIcon>
            <ListItemText primary="Drag Memo" />
            <ListItemSecondaryAction>
              <Switch
                onChange={event => this.dragToggleSwitched(event)}
                checked={this.state.checked}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem 
            button
            onClick={this.createOnClick}>
            <ListItemIcon>
              <Create color="primary" />
            </ListItemIcon>
            <ListItemText primary="Create New Memo" />
          </ListItem>
          <Divider />
          <ListItem 
            button 
            component="a" 
            href="https://github.com/hkKevin/memo" 
            target="_blank" rel="noopener">
            <ListItemText secondary="GitHub Repository" />
          </ListItem>
          <ListItem 
            button 
            component="a" 
            href="https://github.com/hkKevin" 
            target="_blank" rel="noopener">
            <ListItemText secondary="Developed by Pak Kiu Leung" />
          </ListItem>
        </List>
        
          
      </div>
    );

    return (
      <div>
        <AppBar color="inherit" position="fixed" className={classes.root}>
          <Toolbar>
            <IconButton 
               color="primary"
               onClick={this.openDrawer} 
               className={classes.menuButton} 
               aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="primary">
              Memo
            </Typography>
            <div className={classes.grow} />
            <IconButton 
              color="primary" 
              className={classes.searchIcon}
              onClick={this.searchClicked}>
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Fab 
          color="primary" 
          aria-label="Edit" 
          className={classes.fab}
          size="medium"
          onClick={this.createOnClick}>
          <Icon>edit_icon</Icon>
        </Fab>

        <SwipeableDrawer 
          anchor="left"
          open={this.state.menu}  // Is the menu opened or closed
          onOpen={this.openDrawer}  // Open the menu
          onClose={this.closeDrawer} /* Close the menu*/ >
          <div
            tabIndex={0}
            role="button">
            {fullList}
          </div>
        </SwipeableDrawer>
      </div>
    );
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
    showAllMemos: state.showAllMemos,
    selectedId: state.selectedId,
    memosFetched: state.memosFetched,
    filterColor: state.filterColor
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onToggleDraggable: (draggable) => dispatch({ type: 'TOGGLE_DRAGGABLE', isDraggable: draggable }),
    onCreateMemo: () => dispatch({ type: 'CREATE_MEMO' }),
    onFilterMemos: (filterColor) => dispatch({ type: 'FILTER_MEMOS', filterColor: filterColor }),
    onSearch: () => dispatch({ type: 'SEARCH_MEMO' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideMenu));