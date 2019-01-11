const initialState = {
  memos: [],
  selectedMemoTitle: null,
  selectedMemoContent: null,
  // title: '',
  // hasTitle: false,
  content: '',
  // hasContent: false,
  // showModal: false,
  showStoredMemo: false
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case 'NEW_MEMO':
      return { 
        ...state,
        showModal: true,
        // title: '',
        // content: '',
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

    case 'DELETE_INPUT':
      return { 
        ...state,
        title: '',
        // hasTitle: false,
        content: ''
        // hasContent: false
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

    case 'CHANGE_TITLE':      
      return { 
        ...state,
        title: action.title
      }

    case 'CHANGE_CONTENT':      
      return { 
        ...state,
        content: action.content
      }

    default:
      return state;
  }
}

export default reducer;