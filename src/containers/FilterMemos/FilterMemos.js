import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';

import './FilterMemos.css';
import * as actions from '../../store/actions/index';

class FilterMemos extends Component {

	state = {
    modal: false
  }

	toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
	}

  // Filter icon clicked
	filterMemoClicked = () => {
    // this.initMemo();
    this.toggle();
		// this.props.onNewMemo();
  }
  
  // One of the color tile clicked
  colorClicked = filterColor => {
    this.props.onFilterMemos(filterColor);
    this.toggle();
		this.props.history.push('/filtered');
  }

  // Reset the filter, show all memos
  // resetFilter = () => {
  //   this.props.onResetFilter();
  //   // this.props.onFetchMemos();
  //   this.toggle();
  // }

	render() {

		let modal = null;
		// if (!this.props.showStoredMemo) {
			modal = (
				<Modal
					autoFocus
					centered
          isOpen={this.state.modal}
					toggle={this.toggle}
					modalTransition={{ timeout: 1 }}
					size='sm'>
          <ModalHeader>Filter by color</ModalHeader>
					<ModalBody>
						<div className="colorTiles">
              <div id="blue" className="colorTile" onClick={() => this.colorClicked("BLUE")}></div>
              <div id="green" className="colorTile" onClick={() => this.colorClicked("GREEN")}></div>
              <div id="orange" className="colorTile" onClick={() => this.colorClicked("ORANGE")}></div>
              <div id="pink" className="colorTile" onClick={() => this.colorClicked("PINK")}></div>
              <div id="purple" className="colorTile" onClick={() => this.colorClicked("PURPLE")}></div>
              <div id="yellow" className="colorTile" onClick={() => this.colorClicked("YELLOW")}></div>
            </div>
					</ModalBody>
					<ModalFooter className='modalFooter'>
						<Button
							outline
							color="secondary"
							onClick={this.toggle}>CANCEL</Button>
            {/* <Button
							outline
							color="success"
							onClick={() => this.resetFilter()}>SHOW ALL</Button> */}
					</ModalFooter>
				</Modal>
			);
		// }

		return (
			<div>
				<div className='filterBtn'>
					<i
						className="fas fa-filter"
						onClick={this.filterMemoClicked}
						data-tip='Filter by color'></i>
				</div>


				{modal}
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFilterMemos: (filterColor) => dispatch({ type: 'FILTER_MEMOS', filterColor: filterColor }),
    // onResetFilter: () => dispatch({ type: 'RESET_FILTER' })
    // onFetchMemos: () => dispatch(actions.fetchMemos())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterMemos);
