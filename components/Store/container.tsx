interface ContainerProps {
    children: React.ReactNode;
  }
  
  const Container: React.FC<ContainerProps> = ({
      children
  }) => {
    return (
      <div className="mx-auto w-screen">
        {children}
      </div>
    );
  };
  
  export default Container;
  