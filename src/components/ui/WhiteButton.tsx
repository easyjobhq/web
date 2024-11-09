interface ButtonProps {
    title: string;
    onClick: () => void;
}

const WhiteButton: React.FC<ButtonProps> = ({ title, onClick }) => {


    return (
      <div className="border cursor-pointer w-full flex justify-center p-2 rounded-md"
        onClick={onClick}
      >
        <p className="text-black font-semibold">{title}</p>
      </div>
    );
  };
  
  export default WhiteButton;
  