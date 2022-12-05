import React from "react";
import "./styles.scss";

function ListCollaborator({ collaborators }) {
  const collaboratorsList = () =>
    collaborators.map((collaborator) => {
      return (
        <a
          className="collaborator-item"
          href={collaborator.html_url}
          target="_blank"
          key={collaborator.id} rel="noreferrer"
        >
          <img
            className="collaborator-image"
            src={collaborator.avatar_url}
            alt={collaborator.login}
          />
          <p className="collaborator-name">
            {collaborator.login}
          </p>
        </a>
      );
    });

  return <div className="list-collaborator">{collaboratorsList()}</div>;
}

export { ListCollaborator };
