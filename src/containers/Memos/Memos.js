import React from 'react';
import { connect } from 'react-redux';
import { WidthProvider, Responsive } from "react-grid-layout";
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import * as actions from '../../store/actions/index';
import AddMemo from '../../containers/AddMemo/AddMemo';
import SideMenu from '../../components/UI/SideMenu/SideMenu';
import Toast from '../../components/UI/Toast/Toast';
import Modal from '../../components/UI/Modal/Modal';
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
  },
  close: {
    padding: theme.spacing.unit * 0.5
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
    };
    
  }

  componentWillMount() {
    this.props.onFetchMemos();
  }

  onLayoutChange(layout, newLayout) {
      saveToLS("layouts", newLayout);
      this.setState({ layouts: newLayout })
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

    const { classes } = this.props;
    
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

        {this.props.showStoredMemo ? <Modal /> : null}
        <Toast toastMsg={this.props.toastMsg} />
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
    addedMemos: state.memos,
    tempMemos: state.tempMemos,
    showStoredMemo: state.showStoredMemo,
    // showAllMemos: state.showAllMemos,
    memosFetched: state.memosFetched,
    filterColor: state.filterColor,
    draggable: state.draggable,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Memos));