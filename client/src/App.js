import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [repoDetails, setRepoDetails] = useState(null);

  // Event handler for input change
  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  // Event handler for search button click
  const handleSearch = async () => {
    try {
      // Fetch user details from the backend API
      const userResponse = await fetch(`/api/users/${username}`);
      const userData = await userResponse.json();
      setUserDetails(userData);

      if (userData.repos_url) {
        // If user has repositories, fetch repository details
        const reposResponse = await fetch(userData.repos_url);
        const reposData = await reposResponse.json();
        setRepoDetails(reposData);
      } else {
        setRepoDetails(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Github User Search</h1>
      <input type="text" value={username} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      {userDetails && (
        <div>
          <h2>User Details</h2>
          <img src={userDetails.avatar_url} alt="User Avatar" />
          <p>Username: {userDetails.login}</p>
          <p>Bio: {userDetails.bio}</p>
        </div>
      )}
      {repoDetails && (
        <div>
          <h2>Repo Details</h2>
          {repoDetails.map((repo) => (
            <div key={repo.id}>
              <h3>{repo.name}</h3>
              <p>Description: {repo.description}</p>
              <p>Last Commit Date: {repo.updated_at}</p>
              <p>Creation Date: {repo.created_at}</p>
              <h4>Last 5 Commits:</h4>
              <ul>
                {repo.commits_url && (
                  // Render CommitList component to fetch and display commit details
                  <CommitList commitsUrl={repo.commits_url} />
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Component for displaying the last 5 commits
function CommitList({ commitsUrl }) {
  const [commits, setCommits] = useState([]);

  // Fetch commit details using the commits URL
  useEffect(() => {
    async function fetchCommits() {
      try {
        const response = await fetch(commitsUrl.replace('{/sha}', ''));
        const data = await response.json();
        setCommits(data.slice(0, 5));
      } catch (error) {
        console.error(error);
        setCommits([]);
      }
    }

    fetchCommits();
  }, [commitsUrl]);

  return (
    <>
      {commits.map((commit) => (
        <li key={commit.sha}>{commit.commit.message}</li>
      ))}
    </>
  );
}

export default App;
