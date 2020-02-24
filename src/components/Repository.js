import * as React from "react";
import { useParams } from 'react-router-dom';

const Repository = () => {
  const { id } = useParams();
  const [repoData, setRepoData] = React.useState(null);
  const [repoError, setRepoError] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://api.github.com/repositories/${id}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error("Not 200");
        } else {
          return res.json();
        }
      })
      .then(
        (result) => {
          setRepoData(result);
          setRepoError(false);
        },
        (error) => {
          setRepoError(true);
        }
      )
      .catch(e => {
        setRepoError(true);
      })
  }, [id]);

  return (
    <div>
      {repoData && !repoError ? (
        <div>
          <h1>{repoData.full_name}</h1>
          <p>{repoData.description}</p>
          <p>Stargazers: {repoData.stargazers_count}</p>
          <p>Open Issues: {repoData.open_issues_count} (<a href={`${repoData.html_url}/issues`} target='_blank' rel='noopener noreferrer'>See All Issues</a>)</p>
          <a href={`${repoData.html_url}/pulls`} target='_blank' rel='noopener noreferrer'>See All Pull Requests</a>
          {repoData.license ? (
            <div>
              <h3><a href={repoData.license.url} target='_blank' rel='noopener noreferrer'>{repoData.license.name}</a> ({repoData.license.spdx_id})</h3>
            </div> ) : (
              <p>No license available</p>
            )
          }
        </div>
      ) : (
        <p>There's nothing here :(</p>
      )}
    </div>
  );
};

export default Repository;
