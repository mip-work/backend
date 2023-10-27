import { useAuthUserQuery } from '../../api/endpoints/auth.endpoint';

interface Props {
  src?: string;
  name: string;
  title?: string;
  className?: string;
  onClick?: () => void;
  style?: {};
  size?: string;
}

const Avatar = (props: Props) => {
  const { src, name, title, className, onClick, style, size } = props;
  const { data: User } = useAuthUserQuery();

  return (
    <>
      {User &&
        <div
          className={`relative grid shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full 
             ${User.username === name ? "bg-green-500" : "bg-amber-500"}
             ${size} ${className ?? 'h-8 w-8 border-[1px]'
            }`}
          title={title ?? name}
          {...{ style, onClick }}
        >
          <div>{name.at(0)}</div>
          {src && <img src={src} alt={name} className='absolute block h-full w-full object-cover' />}
        </div>
      }
    </>
  );
}

export default Avatar;
