import { useEffect, useState } from 'react';
import { api } from '@database/api';

interface Props<T> {
  url: string,
  dependencies?: any[];
};

const useFetch = <T>({url, dependencies=[]}: Props<T>) => {

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<T>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(url);
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
    return () => { setLoading(false) }
  }, dependencies);

  return {
    data,
    setData,
    loading,
  }
}

export default useFetch