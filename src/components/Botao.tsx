interface BotaoProps {
    cor?: 'blue' | 'green' | 'gray' | 'red';
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
  }
  
  const cores = {
    blue: 'from-blue-400 to-blue-700',
    green: 'from-green-400 to-green-700',
    gray: 'from-gray-400 to-gray-700',
    red: 'from-red-400 to-red-700',
  };
  
  export default function Botao(props: BotaoProps) {
    const cor = props.cor ?? 'gray';
    const gradiente = cores[cor];
  
    return (
      <button
        onClick={props.onClick}
        className={`
          bg-gradient-to-r ${gradiente}
          text-white px-4 py-2 rounded-md
          hover:brightness-110 transition-all duration-300
          ${props.className}
        `}
      >
        {props.children}
      </button>
    );
  }
  