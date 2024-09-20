const LinkCellRenderer = (props) => {
  const handleClick = () => {
    // Handle the click event, for example, navigate to a different page or show more details
    alert(`Clicked on ${props.value}`);
  };

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className="text-blue-500 hover:underline"
    >
      {props.value}
    </a>
  );
};

export default LinkCellRenderer;
