import PropTypes from "prop-types";

export const UserCard = ({ name }) => {
  return (
    <>
      <div>{name || "no name"}</div>
    </>
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};
