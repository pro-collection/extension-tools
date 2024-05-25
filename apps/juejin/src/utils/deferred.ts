const Deferred = () => {
  const deferred: {
    promise?: Promise<any>;
    resolve?: (value?: any) => void;
    reject?: (value?: any) => void;
  } = {};

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
};

export default Deferred;
