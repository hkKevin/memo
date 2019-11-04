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
          List, 
          SwipeableDrawer, 
          Switch,
          Fab,
          Icon,
          Link,
          Tooltip } from '@material-ui/core';
import {  Create, 
          DragHandle,
          ArchiveOutlined } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

import './SideMenu.css';

const styles = theme => ({
  fullList: {
    width: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20
  },
  menuButton: {
    marginLeft: -12
  },
  searchIcon: {
    marginRight: -12
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: theme.zIndex.tooltip
  },
  credit: {
    bottom: theme.spacing.unit * 1,
    position: 'absolute'
  },
  link: {
    margin: theme.spacing.unit * 3,
    display: 'block'
  }
});


class SideMenu extends Component {
  state = {
    menu: false,
    checked: false
    // openNestedList: false
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

  // Search icon is clicked
  searchClicked = () => {
    this.props.onSearch();  // Show all memos and ready to filter memos by text
    this.props.history.push('/memo/filter'); // Redirect to that path
    this.props.onToggleDraggable(false);  // Turn drag mode OFF
  }

  // When web app title is clicked, scroll to top
  titleClicked = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  showArchivedMemos = () => {
    this.props.history.push('/memo/archive');
    this.props.onToggleDraggable(false);  // Turn drag mode OFF
  }

  render() {
    const { classes } = this.props;

    const fullList = (
      <div className={classes.fullList}>
        <List>
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

          <ListItem
            button
            onClick={this.showArchivedMemos}>
            <ListItemIcon>
              <ArchiveOutlined color="primary" />
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItem>
        </List>
      </div>
    );

    const links = (
      <Typography className={classes.credit}>
        <Link 
          href="https://github.com/hkKevin/memo" 
          target="_blank" 
          rel="noopener" 
          className={classes.link} 
          color="textSecondary">
          GitHub Repository
        </Link>
        <Link 
          href="https://github.com/hkKevin" 
          target="_blank" 
          rel="noopener" 
          className={classes.link} 
          color="textSecondary">
          Developed by Pak Kiu Leung (Kevin)
        </Link>
      </Typography>
    );

    return (
      <div>
        <AppBar color="inherit" position="fixed">
          <Toolbar>
            <IconButton 
               color="primary"
               onClick={this.openDrawer} 
               className={classes.menuButton} 
               aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Tooltip title="Scroll to top">
              <Typography
                id="appTitle"
                className={classes.title}
                onClick={this.titleClicked}
                variant="h6" 
                color="primary">
                MEMO
              </Typography>
            </Tooltip>
            <Tooltip title="Find">
              <IconButton 
                color="primary" 
                className={classes.searchIcon}
                onClick={this.searchClicked}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Tooltip title="New">
          <Fab 
            color="primary" 
            aria-label="Edit" 
            className={classes.fab}
            size="medium"
            onClick={this.createOnClick}>
            <Icon>edit_icon</Icon>
          </Fab>
        </Tooltip>

        <SwipeableDrawer 
          anchor="left"
          open={this.state.menu}  // Is the menu opened or closed
          onOpen={this.openDrawer}  // Open the menu
          onClose={this.closeDrawer} /* Close the menu*/ >
          <div
            tabIndex={0}
            role="button">
            {fullList}
            {links}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onToggleDraggable: (draggable) => dispatch({ type: 'TOGGLE_DRAGGABLE', isDraggable: draggable }),
    onCreateMemo: () => dispatch({ type: 'CREATE_MEMO' }),
    onSearch: () => dispatch({ type: 'SEARCH_MEMO' })
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(SideMenu));