import * as React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { getRepositoryRoute } from "../constants/routes";

const AllResults = styled.div`
  a {
    color: black;
    text-decoration: none;
  }
`;

const Card = styled.div`
  padding: 15px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px 0;
`;

const RepositorySearchResults = ({ searchResults }) => {
  const cardResults = searchResults && searchResults.items.map((item, index) => {
    return (
      <Link key={index} to={getRepositoryRoute(item.id)}>
        <Card>
          <h3>{item.full_name}</h3>
          <p>{item.description}</p>
          <p>Stargazers: {item.stargazers_count}</p>
          <p>Open Issues: {item.open_issues_count}</p>
        </Card>
      </Link>
    );
  })
  return (
    <AllResults>
      {searchResults && searchResults.total_count > 0 ? cardResults : "There's nothing here"}
    </AllResults>
  );
};

export default RepositorySearchResults;
