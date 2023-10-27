import Avatar from "./Avatar";

interface Props {
  text: string;
  icon?: string;
  size: string;
  variant?: 'ROUND' | 'SQUARE';
  className?: string;
}

const Item = (props: Props) => {
  const { className, text, icon, size, variant = 'SQUARE' } = props;

  return (
    <div className='flex items-center truncate font-normal text-c-1'>
      {icon !== undefined &&
        (icon ? (
          <img
            src={icon}
            alt={text}
            className={`mr-4 ${size} ${variant === 'ROUND' ? 'rounded-full object-cover' : ''}`}
          />
        ) : (
            <Avatar 
            name={text} 
            size={size} 
            className={`mr-4 grid text-ms text-white ${className}`} />
        ))}
    {text}
    </div>
  );
};

export default Item;
