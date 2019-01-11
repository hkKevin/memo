// import React, { Component } from 'react';
// import { Modal, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

// class CustomModal extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
// 			 title: '',
// 			 content: '',
// 			 hasTitle: false,
// 			 hasContent: false,
// 			hasTitleAndContent: false
//     };

//     this.toggle = this.toggle.bind(this);
//   }

//   componentDidUpdate(){
//     console.log(this.props.showModal);
//   }

//   toggle() {
//     this.props.onToggleModal();
// 	}

// 	saveMemo() {
// 		this.props.onSaveMemo(this.props.title, this.props.content);
// 	}

// 	deleteInput() {
//     this.props.onDeleteInput();
// 		// this.setState({
// 		// 	title: '',
// 		// 	hasTitle: '',
// 		// 	content: '',
// 		// 	hasContent: ''
// 		// })
// 	}

// 	saveMemoClicked = () => {
// 		this.toggle();
//     this.saveMemo();
// 	}

// 	initMemo = () => {
// 	  this.toggle();
// 		this.deleteInput();
//   }

  
  




//   titleChangedHandler = (event) => {
// 		if (event.target.value === null || event.target.value === '') {
// 			this.setState({hasTitle: false});
// 		} else {
// 			this.setState({hasTitle: true});
// 		}

//     this.props.onChangeTitle(event.target.value);
// 		//this.setState({title: event.target.value});
// 	}

// 	contentChangedHandler = (event) => {
// 		if (event.target.value === null || event.target.value === '') {
// 			this.setState({hasContent: false});
// 		} else {
// 			this.setState({hasContent: true});
// 		}

//     this.props.onChangeContent(event.target.value);
// 		//this.setState({content: event.target.value});
//   }
//   render () {
//     let atLeastOneInputHasValue = this.state.hasTitle || this.state.hasContent;

//     return (
//       <Modal 
//         isOpen={this.props.showModal} 
//         toggle={this.toggle} 
//         modalTransition={{ timeout: 1 }} 
//         size='lg'>
//         <ModalBody>
//           <Input 
//             onChange={this.titleChangedHandler} 
//             value={this.props.selectedMemoTitle} 
//             type='text' 
//             placeholder='Title'
//             name='title'
//             className='InputField' />
//           <hr />
//           <Input 
//             onChange={this.contentChangedHandler} 
//             value={this.props.selectedMemoContent} 
//             type='textarea'
//             rows='8' 
//             placeholder='Content'
//             name='content'
//             className='TextArea' />
//         </ModalBody>
//         <ModalFooter>
//           <Button color="danger" 
//             onClick={this.initMemo}>CANCEL</Button>
//           <Button color="primary" 
//             onClick={this.saveMemoClicked}
//             disabled={!atLeastOneInputHasValue}>SAVE</Button>
//         </ModalFooter>
//       </Modal>
//     );
//   }
  

// }

// const mapStateToProps = state => {
//   return {
//     showModal: state.showModal,
//     selectedMemoTitle: state.selectedMemoTitle,
//     selectedMemoContent: state.selectedMemoContent,
//     title: state.title,
//     hasTitle: state.hasTitle,
//     content: state.content,
//     hasContent: state.hasContent
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onSaveMemo: (title, content) => dispatch({type: 'SAVE_MEMO', memoData: {title: title, content: content}}),
//     onToggleModal: () => dispatch({type: 'TOGGLE_MODAL'}),
//     onDeleteInput: () => dispatch({type: 'DELETE_INPUT'}),
//     onChangeTitle: (title) => dispatch({type: 'CHANGE_TITLE'}, {title: title}),
//     onChangeContent: (content) => dispatch({type: 'CHANGE_CONTENT'}, {content: content})
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);