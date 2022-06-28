import { NextPage } from 'next/types';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { getKanyeQuote } from '../shared/store/features/kanye';
import { wrapper } from '../shared/store/store';

const kanye: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data, pending, error } = useAppSelector((state) => state.kanyeQuote);

  return (
    <div>
      <h2>Generate random Kanye West quote</h2>
      {pending && <p>Loading...</p>}
      {data && <p>{data.quote}</p>}
      {error && <p>Oops, something went wrong</p>}
      <button onClick={() => dispatch(getKanyeQuote())} disabled={pending}>
        Generate Kanye Quote
      </button>
    </div>
  );
};

kanye.getInitialProps = wrapper.getInitialPageProps(
  ({ dispatch }) =>
    async () => {
      await dispatch(getKanyeQuote({
        data: { quote: 'click that button' },
        loading: null,
        pending: false,
        error: false,
      }));
    }
);

export default kanye;
