import axios from '../../axios-orders';

// ActionCreators:

export const saveMemoSuccess = (memoData) => {
  return {
    type: 'SAVE_MEMO_SUCCESS',
    // memoId: id,
    memoData: memoData
  };
};

export const saveMemo = (memoData)  => {
  return dispatch => {
    axios.post('/memos.json', memoData)
      .then(response => {
        // console.log(response.data);
        dispatch(saveMemoSuccess(memoData));
      })
  };
};