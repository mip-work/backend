type ProgressBarProps = {
  progress: number;
};

//FIX

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <div
      className={`flex justify-start rounded-xl bg-[#2563EB] ${
        props.progress === 0 ? "text-black" : "pl-1 pr-1 text-white"
      }  w-[${props.progress.toString()}%] } shadow-sm shadow-black transition-all`}
    >
      {props.progress + "%"}
    </div>
  );
};

export default ProgressBar;
