let reporter = store => next => action => {
  console.log('__ACTION__', action);
  try{
    let result = next(action);
    console.log('__STATE__', store.getState());
    return result;
  }catch(err){
    err.action;
    console.error('__ERROR__', err);
    return error;
  }
};

export default reporter;
