import React from "react";
import collaboratorsJSON from "../../contributors.json";
import { edges } from "../../logic/edges";
import { ListCollaborator } from "../../components/ListCollaborator";
import { Button, Alert } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./styles.scss";

function Connection() {
  const query = useParams();

  const [followers, setFollowers] = React.useState([]);
  const [collaborator, setCollaborator] = React.useState("");
  const [type, setType] = React.useState("followers");

  React.useEffect(() => {
    const { login, type: connectionType } = query;

    if (login && connectionType) {
      setCollaborator(login);
      setType(connectionType);

      const followersLogin = edges(login, connectionType);
      const hydratedFollowersLogins = followersLogin
        .sort()
        .map((suggestLogin) =>
          collaboratorsJSON.find(({ login }) => login === suggestLogin)
        );

      setFollowers(hydratedFollowersLogins);
    }
  }, [query]);

  function handleLink() {
    if (type === "Seguidores") {
      return "Seguindo";
    }
    return "Seguidores";
  }

  function handleMessage() {
    if (type === "Seguidores") {
      return "O usuário não tem seguidores da organização";
    }
    return "O usuário não segue pessoas da organização";
  }

  return (
    <div className="container-suggestion">
      <p className="page-title">
        {collaborator} - {type}
      </p>
      <div className="button-group">
        <Button variant="outlined" color="secondary">
          <Link to={`/${collaborator}`}>Sugestões</Link>
        </Button>
        <Button variant="outlined" color="secondary">
          <Link to={`/Connection/${collaborator}/${handleLink()}`}>
            {handleLink()}
          </Link>
        </Button>
      </div>
      {followers.length && <ListCollaborator collaborators={followers} />}
      {!followers.length && <Alert severity="warning">{handleMessage()}</Alert>}
    </div>
  );
}

export default Connection;
