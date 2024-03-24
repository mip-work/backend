import { useAuthUserQuery } from '../../api/endpoints/auth.endpoint';

interface Props {
  src?: string;
  name: string;
  title?: string;
  className?: string;
  onClick?: () => void;
  style?: {};
}

const Avatar = (props: Props) => {
  const { src, name, title, className, onClick, style } = props;
  const { data: User } = useAuthUserQuery();

  return (
    <>
      {User &&
        <div
          className={`relative grid shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full 
             ${User.username === name ? "bg-green-500" : "bg-amber-500"}
            ${className ?? 'h-8 w-8 border-[1px]'}`}
          title={title ?? name}
          {...{ style, onClick }}
        >
          <div>{name}</div>
          {src && <img src={src} alt={name} className='absolute block h-full w-full object-cover' />}
        </div>
      }
    </>
  );
}
// .at(0)?.slice(0, 1).toUpperCase()
export default Avatar;
