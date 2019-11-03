import firebase from 'firebase';

// Action Reducer

const initialState = {
  memos: [],
  selectedMemoTitle: null,
  selectedMemoContent: null,
  selectedId: null,
  selectedMemoColor: null,
  showModal: false,
  showNewMemoDialog: false,
  showStoredMemo: false,
  filterColor: "",
  arrIndex: 0,
  memosFetched: false,
  draggable: false,
  searchingMemo: false,
  toastMsg: ""
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

    case 'SAVE_MEMO_SUCCESS':
      const newMemo = {
        ...action.memoData,
        id: action.firebaseItemId
      }
      return {
        ...state,
        memos: state.memos.concat(newMemo),
        selectedId: newMemo.id,
        toastMsg: "Memo saved" // Notify user when the new memo saved
      }

    case 'FETCH_MEMOS_SUCCESS':
      return {
        ...state,
        memos: action.memos,
        memosFetched: true,
        toastMsg: "Double-click to edit memo" // Notify user when the web app loaded/ reloaded
      }


    // Within Memos.js:

    case 'HIDE_TOAST':
      return {
        ...state,
        toastMsg: "" // Set toastMsg to empty string -> Hide the toast
      }

    case 'UPDATE_ID':
      const editedmemos = state.memos.map( (memo, index) => {
      // Only edit the newly added memo in the memos array
      if (memo.id === state.selectedId) {
        memo.id = state.selectedId;
        state.arrIndex = index
      }
      return memo;
      })
      
      const firebaseDb = firebase.database();
      const updateIdUpdates = {};
      // Update the selected array element to specific child node of Firebase
      updateIdUpdates['/memos/' + state.selectedId] = editedmemos[state.arrIndex];
      firebaseDb.ref()
        .update(updateIdUpdates)
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

      let deleteMemoUpdates = {};
      deleteMemoUpdates['/memos/' + action.memoId] = renewMemos[state.arrIndex];
      action.firebaseDb.ref().update(deleteMemoUpdates)
        .then(() => {
          // memo deleted in firebase.       
        })
        .catch((error) => {
          console.error(error);
        })
      return { 
        ...state,
        memos: state.memos.filter(memo => memo.id !== action.memoId),
        toastMsg: "Memo deleted"
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
        state.arrIndex = index
      }
      return memo;
      })
      
      const updateMemoUpdates = {};
      // Update the selected array element to specific child node of Firebase
      updateMemoUpdates['/memos/' + state.selectedId] = updatedmemos[state.arrIndex];
      action.firebaseDb.ref()
        .update(updateMemoUpdates)
        .then(() => {
          // memo updated in firebase.
        })
        .catch((error) => {
          console.log(error);
        })
      // return state;
      return {
        ...state,
        toastMsg: "Memo updated"
      }


    case 'CHANGE_COLOR':
      const colorChangedMemos = state.memos.map( (memo, index) => {
        // Only edit selected memo in the memos array
        if (memo.id === state.selectedId) {
          memo.color = action.memoColor
          state.arrIndex = index
        }
        return memo;
      })

      const changeColorUpdates = {};
      
      // Update the selected array element to specific child node of Firebase
      changeColorUpdates['/memos/' + state.selectedId] = colorChangedMemos[state.arrIndex];
      action.firebaseDb.ref()
        .update(changeColorUpdates)
        .then(() => {
          // memo updated in firebase.
        })
        .catch((error) => {
          console.log(error);
        })
      return {
        ...state,
        memos: colorChangedMemos,
        selectedMemoColor: action.memoColor,
        toastMsg: "Color updated"
      }
    
    // Only show memos with selected color
    case 'FILTER_MEMOS':      
      return { 
        ...state,
        filterColor: action.filterColor,
        searchingMemo: false
      }

    case 'CLEAR_FILTER':
      return { 
        ...state,
        filterColor: "",
        searchingMemo: true
      }

    case 'TOGGLE_DRAGGABLE':      
      return { 
        ...state,
        draggable: action.isDraggable
      }

    case 'CREATE_MEMO':
      return { 
        ...state,
        showModal: true,
        showStoredMemo: false
      }
    
      // Filter memos by text
    case 'SEARCH_MEMO':
      return { 
        ...state,
        searchingMemo: true
      }
    

    default:
      return state;
  }
}

export default memos;