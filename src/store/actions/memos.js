import axios from '../../axios-orders';

// ActionCreators:

export const saveMemoSuccess = (memoData, firebaseItemId) => {
  return {
    type: 'SAVE_MEMO_SUCCESS',
    firebaseItemId: firebaseItemId,
    memoData: memoData,
  };
};

export const saveMemo = (memoData)  => {
  return dispatch => {
    axios.post('/memos.json', memoData)
      .then(response => {
        console.log(response.data);
        dispatch(saveMemoSuccess(memoData, response.data.name));
      })
      .catch(error => {
        console.log(error);
      })
  };
};

export const fetchMemosSuccess = (memos) => {
  return {
    type: 'FETCH_MEMOS_SUCCESS',
    memos: memos
  }
}

export const fetchMemos = () => {
  return dispatch => {
    axios.get('/memos.json')
      .then(response => {
        const fetchedMemos = [];
        for (let key in response.data) {
          fetchedMemos.push( response.data[key] );
        }
        dispatch(fetchMemosSuccess(fetchedMemos));
      })
      .catch(error => {
        console.log(error);
      })
  };
};

export const updateMemoSuccess = (updatedMemos) => {
  return {
    type: 'UPDATE_MEMO_SUCCESS',
    memos: updatedMemos
  };
};

export const updateMemo = () => {
  return {
    type: 'UPDATE_MEMO',
  }
};