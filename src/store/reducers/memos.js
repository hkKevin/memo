const initialState = {
  memos: [],
  selectedMemoTitle: null,
  selectedMemoContent: null,
  selectedId: null,
  showModal: false,
  showStoredMemo: false,
  selectedMemoColor: null
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

    case 'SAVE_MEMO':
      const newMemo = {
          id: new Date().getTime(),
          title: action.memoTitle,
          content: action.memoContent,
          color: 'yellow'
      }
      return {
        ...state,
         memos: state.memos.concat(newMemo)
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
      const updatedMemos = state.memos.map(memo => {
        if (memo.id === state.selectedId) {
          memo.title =  state.selectedMemoTitle;
          memo.content = state.selectedMemoContent;
        }
        return memo;
      })
      return {
        ...state,
        memos: updatedMemos
      }

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