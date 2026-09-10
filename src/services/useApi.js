import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiFunction, options = {}) => {
  const [data, setData] = useState(options.initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunction(...args);
        const responseData = response.data;

        if (options.onSuccess) {
          options.onSuccess(responseData);
        }

        setData(responseData);
        return responseData;
      } catch (err) {
        const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
        setError(errorMessage);

        if (options.onError) {
          options.onError(errorMessage);
        }

        return Promise.reject(err);
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, options]
  );

  return { data, loading, error, execute };
};

export const useApiOnMount = (apiFunction, options = {}) => {
  const { data, loading, error, execute } = useApi(apiFunction, options);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await execute(...(options.args || []));
      } catch (err) {
        if (!options.swallowErrors) {
          console.error('API call failed:', err);
        }
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, refetch: execute };
};