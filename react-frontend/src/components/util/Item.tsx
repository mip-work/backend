import Avatar from "./Avatar";

interface Props {
  text: string;
  icon?: string;
  size: string;
  variant?: 'ROUND' | 'SQUARE';
  className?: string;
}

const Item = ({ className, text, icon, size, variant = 'SQUARE' }: Props) => {

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
            className={`mr-4 grid text-ms text-white 
            ${className}
            ${size}`}/>
        ))}
    {text}
    </div>
  );
};

export default Item;
