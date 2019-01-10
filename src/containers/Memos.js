import React, { Component } from 'react';
import { connect } from 'react-redux';

import Memo from '../components/Memo/Memo';
import AddMemo from '../components/AddMemo/AddMemo';

class Memos extends Component {

  componentDidUpdate(){
    console.log(this.props.addedMemos)
  }

  render () {
    return (
      <div>
        <AddMemo />
        {this.props.addedMemos.map(memo => (
          <Memo 
            key={memo.id}
            title={memo.title} 
            content={memo.content} 
            clicked={() => this.props.onDeleteMemo(memo.id)}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedMemos: state.memos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteMemo: (id) => dispatch({type: 'DELETE_MEMO', memoId: id})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memos);