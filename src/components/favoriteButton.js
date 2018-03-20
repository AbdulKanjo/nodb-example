import React from "react";
import "./../styling/App.css";

// This is an example of a functional component. These are used when you do not need state and functionality is limited. Also be mindful of the fact that within functional components props are accessed without the keyword "this".
const FavoriteButton = props => {
  return <button className="fav-btn" onClick={() => props.add()} />;
};

export default FavoriteButton;
