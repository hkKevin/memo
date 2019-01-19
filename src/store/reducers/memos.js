import firebase from 'firebase';

// Action Reducer

const initialState = {
  memos: [],
  selectedMemoTitle: null,
  selectedMemoContent: null,
  selectedId: null,
  selectedMemoColor: null,
  showModal: false,
  showStoredMemo: false,
  arrIndex: 0
}

const memos = (state = initialState, action) => {

  switch ( action.type ) {

    // Within both AddMemo.js & Memos.js:

    case 'TOGGLE_MODAL':
      return { 
        ...state,
        showModal: !state.showModal
      }

    // Within AddMemo.js:

    case 'NEW_MEMO':
      return { 
        ...state,
        showModal: true,
        showStoredMemo: false
      }

    case 'SAVE_MEMO_SUCCESS':
      const newMemo = {
        ...action.memoData,
        id: action.firebaseItemId
      }
      return {
        ...state,
        memos: state.memos.concat(newMemo),
        selectedId: newMemo.id
      }

    case 'FETCH_MEMOS_SUCCESS':
      return {
        ...state,
        memos: action.memos
      }

    // Within Memos.js:

    case 'UPDATE_ID':
    const editedmemos = state.memos.map( (memo, index) => {
    // Only edit the newly added memo in the memos array
    if (memo.id === state.selectedId) {
      memo.id = state.selectedId;
      state.arrIndex = index
    }
    return memo;
    })
    
    const db2 = firebase.database();
    const updates2 = {};
    // Update the selected array element to specific child node of Firebase
    updates2['/memos/' + state.selectedId] = editedmemos[state.arrIndex];
    db2.ref()
      .update(updates2)
      .then(() => {
        // memo updated in firebase.
      })
      .catch((error) => {
        console.log(error);
      })
    return state;
      

    case 'STORE_COLOR':
      return {
        ...state,
        selectedMemoColor: action.memoColor
      }

    case 'DELETE_MEMO':
      const renewMemos = state.memos.map( (memo, index) => {
        // Only delete selected memo that is in the memos array
        if (memo.id === action.memoId) {
          memo = null
          state.arrIndex = index
        }
        return memo;
        })

      const db3 = firebase.database();
      let updates3 = {};
      updates3['/memos/' + action.memoId] = renewMemos[state.arrIndex];
      // db3.ref('/memos/').child(action.memoId).update(updates3)
      db3.ref().update(updates3)
        .then(() => {
          // memo deleted in firebase.       
        })
        .catch((error) => {
          console.error(error);
        })
      return { 
        ...state,
        memos: state.memos.filter(memo => memo.id !== action.memoId)
      }      

    case 'SELECT_MEMO':      
      return { 
        ...state,
        selectedMemoTitle: action.memoTitle,
        selectedMemoContent: action.memoContent,
        showStoredMemo: true
      }

    case 'STORE_ID':      
      return { 
        ...state,
        selectedId: action.memoId
      }

    case 'CHANGE_TITLE':      
      return { 
        ...state,
        selectedMemoTitle: action.memoTitle
      }

    case 'CHANGE_CONTENT':      
      return { 
        ...state,
        selectedMemoContent: action.memoContent
      }

    case 'UPDATE_MEMO':
      const updatedmemos = state.memos.map( (memo, index) => {
      // Only edit the selected memo in the memos array
      if (memo.id === state.selectedId) {
        memo.id = state.selectedId;
        memo.title =  state.selectedMemoTitle;
        memo.content = state.selectedMemoContent;
        memo.color = state.selectedMemoColor;
        state.arrIndex = index
      }
      return memo;
      })
      
      const db = firebase.database();
      const updates = {};
      // Update the selected array element to specific child node of Firebase
      updates['/memos/' + state.selectedId] = updatedmemos[state.arrIndex];
      db.ref()
        .update(updates)
        .then(() => {
          // memo updated in firebase.
        })
        .catch((error) => {
          console.log(error);
        })
      return state;    

    case 'CHANGE_COLOR':
      const colorChangedMemos = state.memos.map( (memo, index) => {
        // Only edit selected memo in the memos array
        if (memo.id === state.selectedId) {
          memo.color = action.memoColor
          state.arrIndex = index
        }
        return memo;
      })
      return {
        ...state,
        memos: colorChangedMemos
      }

      // const colorChangedMemos = state.memos.map( (memo, index) => {
      // // Only edit selected memo in the memos array
      // if (memo.id === state.selectedId) {
      //   if (state.selectedMemoColor === 'yellow') {
      //     memo.color = 'blue';
      //     state.selectedMemoColor = 'blue';
      //   } else {
      //     memo.color = 'yellow';
      //     state.selectedMemoColor = 'yellow';
      //   }
      //   state.arrIndex = index
      // }
      // return memo;
      // })
      
      // const db4 = firebase.database();
      // const updates4 = {};
      // // Update the selected array element to specific child node of Firebase
      // updates4['/memos/' + state.selectedId] = colorChangedMemos[state.arrIndex];
      // db4.ref()
      //   .update(updates4)
      //   .then(() => {
      //     // memo updated in firebase.
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   })
      // return {
      //   ...state,
      //   memos: colorChangedMemos
      // }


    default:
      return state;
  }
}

export default memos;