import React, { useState, Fragment } from "react";
import {  useNavigate } from "react-router-dom";
import MetaData from "../layout/Header/MetaData";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
      // console.log(keyword);
    } else {
      navigate("/products");
      // console.log("here");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;



// import React, { useState, Fragment } from "react";
// import MetaData from "../layout/Header/MetaData";
// import "./Search.css";

// const Search = ({ history }) => {
//   const [keyword, setKeyword] = useState("");

//   const searchSubmitHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       history.push(`/products/${keyword}`);
//     } else {
//       history.push("/products");
//     }
//   };

//   return (
//     <Fragment>
//       <MetaData title="Search A Product -- ECOMMERCE" />
//       <form className="searchBox" onSubmit={searchSubmitHandler}>
//         <input
//           type="text"
//           placeholder="Search a Product ..."
//           onChange={(e) => setKeyword(e.target.value)}
//         />
//         <input type="submit" value="Search" />
//       </form>
//     </Fragment>
//   );
// };

// export default Search;

// import React, { useState, Fragment } from "react";
// import { useHistory } from "react-router-dom"; // Import useHistory
// import MetaData from "../layout/Header/MetaData";
// import "./Search.css";

// const Search = () => {
//   const history = useHistory(); // Use useHistory to access the history object

//   const [keyword, setKeyword] = useState("");

//   const searchSubmitHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       history.push(`/products/${keyword}`);
//     } else {
//       history.push("/products");
//     }
//   };

//   return (
//     <Fragment>
//       <MetaData title="Search A Product -- ECOMMERCE" />
//       <form className="searchBox" onSubmit={searchSubmitHandler}>
//         <input
//           type="text"
//           placeholder="Search a Product ..."
//           onChange={(e) => setKeyword(e.target.value)}
//         />
//         <input type="submit" value="Search" />
//       </form>
//     </Fragment>
//   );
// };

// export default Search;

// import React, { useState, Fragment } from "react";
// import MetaData from "../layout/Header/MetaData";
// import "./Search.css";

// const Search = ({ history }) => {
//   const [keyword, setKeyword] = useState("");

//   const searchSubmitHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       history.push(`/products/${keyword}`);
//     } else {
//       history.push("/products");
//     }
//   };

//   return (
//     <Fragment>
//       <MetaData title="Search A Product -- ECOMMERCE" />
//       <form className="searchBox" onSubmit={searchSubmitHandler}>
//         <input
//           type="text"
//           placeholder="Search a Product ..."
//           onChange={(e) => setKeyword(e.target.value)}
//         />
//         <input type="submit" value="Search" />
//       </form>
//     </Fragment>
//   );
// };

// export default Search;

