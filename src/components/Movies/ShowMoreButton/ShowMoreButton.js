import React from "react";

const ShowMoreButton = ({onLoadMore}) => {
  return (
    <div className="show-more-button">
      <button onClick={onLoadMore} className="show-more-button__button" type="button">Ещё</button>
    </div>
  );
};

export default ShowMoreButton;
