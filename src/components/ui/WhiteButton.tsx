interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
}

const WhiteButton: React.FC<ButtonProps> = ({ title, onClick, className = '' }) => {
  return (
    <div
      className={`cursor-pointer min-w-40 flex justify-center p-3 rounded-md text-gray-500 font-semibold border border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300 ${className}`}
      onClick={onClick}
    >
      <p className="font-semibold">{title}</p>
    </div>
  );
};

export default WhiteButton;
