import PropTypes from "prop-types";

const UnauthenticatedLayout = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

UnauthenticatedLayout.propTypes = {
  children: PropTypes.node,
};

export default UnauthenticatedLayout;
