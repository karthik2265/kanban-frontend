/*
handle loading and error states when fetching or updating data
*/

import { useCallback } from "react";

function useData<T, O>(
  dataProcessingFunction: (options: O) => Promise<null | T>,
  stateDispatcher: (state: { isProcessing: boolean; error: null | string; data: null | T }) => void
) {
  const startProcessing = useCallback(
    function (...params: Parameters<typeof dataProcessingFunction>) {
      stateDispatcher({ isProcessing: true, error: null, data: null });
      dataProcessingFunction(...params)
        .then((data) => {
          stateDispatcher({ data, error: null, isProcessing: false });
        })
        .catch((err: Error) => {
          stateDispatcher({ data: null, error: err.message, isProcessing: false });
        });
    },
    [dataProcessingFunction, stateDispatcher]
  );

  return { startProcessing };
}

export default useData;
