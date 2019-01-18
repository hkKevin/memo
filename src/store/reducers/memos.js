import firebase from 'firebase';

const initialState = {
  memos: [],
  selectedMemoTitle: null,
  selectedMemoContent: null,
  selectedId: null,
  showModal: false,
  showStoredMemo: false,
  selectedMemoColor: null,
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
        memos: state.memos.concat(newMemo)
      }

    case 'FETCH_MEMOS_SUCCESS':
      return {
        ...state,
        memos: action.memos
      }

    // Within Memos.js:
    case 'STORE_COLOR':
      return {
        ...state,
        selectedMemoColor: action.memoColor
      }

    case 'DELETE_MEMO':
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
      const updatedmemo = state.memos.map( (memo, index) => {
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
      updates['/memos/' + state.selectedId] = updatedmemo[state.arrIndex];
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
      const changedColor = state.memos.map(memo => {
        if (memo.id === state.selectedId) {
          if (state.selectedMemoColor === 'yellow'){
            memo.color =  'blue';
            state.selectedMemoColor = 'blue';
          } else {
            memo.color =  'yellow';
            state.selectedMemoColor = 'yellow';
          }
        }
        return memo;
      })
      return {
        ...state,
        memos: changedColor
      }

    default:
      return state;
  }
}

export default memos;