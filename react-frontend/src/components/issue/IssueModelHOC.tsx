import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { types, priorities, progresses } from '../../utils';
import { Category } from '../util/DropDown';
import { useList } from '../../hooks/useList';
import { useMember } from '../../hooks/useMember';

export type IssueMetaData = { listIdx: number; listId: number; idx: number };

interface Props {
  onClose: () => void;
  children: any;
  issue?: IssueMetaData;
}

const IssueModelHOC = ({ children: Component, ...PROPS }: Props) => {
  const projectId = useParams().projectId;
  const { useGetAllMembers } = useMember()
  const { data: apiMembers } = useGetAllMembers(projectId)
  const { useGetList } = useList()
  const { data } = useGetList(projectId)

  const members = apiMembers
    ? (apiMembers.data.data.map(({ username: u, profileUrl: p, userId }: any) => ({
        text: u,
        icon: p,
        value: userId,
      })) as Category[])
    : [];
  const lists = data
    ? (data?.data.data.map(({ id, name }: any) => ({
        text: name,
        id,
      })) as Category[])
    : [];

  return (
    <Component
      {...{
        projectId,
        lists,
        members,
        types,
        priorities,
        progresses
      }}
      {...PROPS}
    />
  );
};

export default IssueModelHOC;

export interface IssueModalProps {
  projectId: number;
  issue?: IssueMetaData;
  members: Category[];
  lists: Category[];
  types: Category[];
  priorities: Category[];
  progresses: Category[];
  onClose: () => void;
}