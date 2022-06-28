import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../shared/store/hooks';
import { decrement, increment, incrementByAmount } from '../shared/store/features/counter';

const IndexPage: React.FC = () => {
  const dispatch = useAppDispatch();
  // const count = useAppSelector(selectCount);
  const { value } = useAppSelector((state) => state.counter);
  const [incrementAmount, setIncrementAmount] = useState<number>(0);

  return (
    <>
      <h1>Welcome to the greatest app in the world!</h1>
      <h2>
        The current number is
        {value}
      </h2>
      <div>
        <input
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
          type="number"
        />
        <button
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}
        >
          Increment by amount
        </button>
      </div>
      <div>
        <button onClick={() => dispatch(decrement())}>Decrement by 1</button>
        <button onClick={() => dispatch(increment())}>Increment by 1</button>
      </div>
    </>
  );
};

export default IndexPage;
