import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { PublicUser } from '../../api/apiTypes';
import Avatar from '../util/Avatar';
import { useMember } from '../../hooks/useMember';

interface Props extends PublicUser {
  added: boolean;
  projectId: number;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const UserMember = ({ id, username, email, profileUrl, added, projectId, setInput }: Props) => {
  const [addMember] = useAddMemberMutation();
  const { useCreateMember } = useMember();
  const createMember = useCreateMember(projectId)

  const handleAddMember = async () => {
    if (added) return;
    await addMember({ userId: id, projectId });
    toast(username + ' has joined to the project!');
    setInput('');
  };

  return (
    <div
      onClick={handleAddMember}
      className={`mb-1 flex items-center rounded-sm bg-c-2 px-3 py-2 text-c-text hover:bg-c-6  ${
        added ? 'pointer-events-none' : 'cursor-pointer'
      }`}
    >
      <Avatar src={profileUrl} name={username} />
      <span className='mx-3'>{username}</span>
      <span className='ml-auto overflow-hidden truncate text-sm font-medium'>{email}</span>
      {added && <Icon className='ml-3' icon='teenyicons:tick-circle-outline' />}
    </div>
  );
};

export default UserMember;
