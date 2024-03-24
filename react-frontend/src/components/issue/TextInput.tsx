import { Dispatch } from 'react';
import WithLabel from '../util/WithLabel';
import { A, T } from './CreateIssueModal';

interface Props {
  dispatch: Dispatch<A>;
  value?: string;
  type: T;
  max: number | string;
  label: string;
}

function TextInput(props: Props) {
  const { dispatch, value, type, max, label } = props;

  return (
    <WithLabel label={label}>
      <div className='relative'>
        <input
          placeholder='a short summary of your project'
          onChange={(e) => dispatch({ type, value: e.target.value })}
          className='mt-2 block w-full rounded-sm border-2 px-3 py-1 text-sm outline-none duration-200 focus:border-chakra-blue'
        />
        {value && (
          <span
            className={`absolute right-0 text-sm italic ${
              Number(value.length) > Number(max) ? 'text-red-400' : 'text-gray-800'
            }`}
          >
            {Number(value.length) > Number(max) ? 'max length exceeded' : <>{Number(max) - value.length} characters left</>}
          </span>
        )}
      </div>
    </WithLabel>
  );
}

export default TextInput;
