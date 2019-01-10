const initialState = {
  memos: [],
  selectedMemoTitle: null,
  selectedMemoContent: null
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case 'ADD_MEMO':
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

    case 'SELECT_MEMO':
      // const memoData = {
      //   title: action.memoTitle,
      //   content: action.memoContent
      // }
      
      return { 
        ...state,
        selectedMemoTitle: action.memoTitle,
        selectedMemoContent: action.memoContent
      }

    default:
      return state;
  }
}

export default reducer;