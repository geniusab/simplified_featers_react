import PropTypes from "prop-types";

export const UserCard = ({ name, age, phone, address }) => {
  return (
    <>
      <div class="card">
        <h2 class="name">{name}</h2>
        <div class="body">
          <div class="label">Age:</div>
          <div>{age}</div>
          <div class="label">Phone:</div>
          <div>{phone}</div>
          <div class="label">Address:</div>
          <div>{address}</div>
        </div>
      </div>
    </>
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};
