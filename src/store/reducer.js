const initialState = {
  memos: [],
  selectedMemoTitle: null,
  selectedMemoContent: null,
  selectedId: null,
  showModal: false,
  showStoredMemo: false
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case 'NEW_MEMO':
      return { 
        ...state,
        showModal: true,
        showStoredMemo: false
      }

    case 'SAVE_MEMO':
      const newMemo = {
          id: new Date().getTime(),
          title: action.memoData.title,
          content: action.memoData.content
      }
      return {
        ...state,
         memos: state.memos.concat(newMemo)
      }
      
    case 'DELETE_MEMO':
      return { 
        ...state,
        memos: state.memos.filter(memo => memo.id !== action.memoId)
      }

    case 'TOGGLE_MODAL':
      return { 
        ...state,
        showModal: !state.showModal
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

    default:
      return state;
  }
}

export default reducer;