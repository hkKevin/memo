import axios from '../../axios-orders';

// Action Creators:

export const saveMemoSuccess = (memoData, firebaseItemId) => {
  return {
    type: 'SAVE_MEMO_SUCCESS',
    memoData: memoData,
    firebaseItemId: firebaseItemId,
  };
};

export const updateId = (memoData, firebaseItemId) => {
  return {
    type: 'UPDATE_ID',
    memoData: memoData,
    firebaseItemId: firebaseItemId,
  };
};

export const saveMemo = (memoData)  => {
  return dispatch => {
    axios.post('/memos.json', memoData)
      .then(response => {
        // console.log(response.data);
        dispatch(saveMemoSuccess(memoData, response.data.name));
        dispatch(updateId(memoData, response.data.name));
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
    // axios.get('/memos.json')
    //   .then(response => {
    //     const fetchedMemos = [];
    //     for (let key in response.data) {
    //       fetchedMemos.push( response.data[key] );
    //     }
    //     dispatch(fetchMemosSuccess(fetchedMemos));
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    const fetchedMemos = []
    fetch('https://memo-a117b.firebaseio.com/memos.json')
      .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
      })
      .then(response => {
        // console.log(response);
        for (let key in response) {
          fetchedMemos.push( response[key] );
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