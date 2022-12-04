import React from "react";
import "./styles.scss";

// import { Container } from './styles';

function ListCollaborator({ collaborators }) {
  const collaboratorsList = () =>
    collaborators.map((collaborator) => {
      return (
        <div className="collaborator-item" key={collaborator.id}>
          <img
            className="collaborator-image"
            src={collaborator.avatar_url}
            alt={collaborator.login}
          />
          <a href={collaborator.html_url} target="_blank" rel="noreferrer">
            {collaborator.login}
          </a>
        </div>
      );
    });

  return <div className="list-collaborator">{collaboratorsList()}</div>;
}

export { ListCollaborator };
