import React from "react";
import collaboratorsJSON from "../../contributors.json";
import suggestion from "../../logic/suggestion";
import { ListCollaborator } from "../../components/ListCollaborator";
import { Link, useParams } from "react-router-dom";
import { Autocomplete, TextField, Alert, Button } from "@mui/material";
import "./styles.scss";

function Home() {
  const query = useParams();
  const [followersSuggestion, setFollowersSuggestion] = React.useState([]);
  const [collaborator, setCollaborator] = React.useState(null);

  React.useEffect(() => {
    const { login } = query;
    if (login) {
      let event = {
        target: {
          value: login,
        },
      };
      handleCollaborator(event);
    }
  }, [query]);

  const handleCollaborator = (event) => {
    setCollaborator(event.target.value);
    const suggestLogins = suggestion(event.target.value).sort();
    if (!suggestLogins.length) return setFollowersSuggestion(collaboratorsJSON);
    const hydratedSuggestLogins = suggestLogins.map((suggestLogin) =>
      collaboratorsJSON.find(({ login }) => login === suggestLogin)
    );

    setFollowersSuggestion(hydratedSuggestLogins);
  };

  return (
    <div className="container-suggestion">
      <p className="page-title">Sugestões</p>
      {collaborator && (
        <div className="button-group">
          <Button variant="outlined" color="secondary">
            <Link to={`/Connection/${collaborator}/Seguindo`}>Seguindo</Link>
          </Button>
          <Button variant="outlined" color="secondary">
            <Link to={`/Connection/${collaborator}/Seguidores`}>
              Seguidores
            </Link>
          </Button>
        </div>
      )}
      <div className="input-area">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={collaboratorsJSON.map((collaborator) => collaborator.login)}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Username" />}
          onSelectCapture={handleCollaborator}
          value={collaborator}
        />
      </div>
      {!suggestion(collaborator).length && (
        <Alert severity="warning">
          O usuário não tem um grupo fortemente conectado ou já segue todos do
          grupo, todos os membros são recomendados
        </Alert>
      )}
      <ListCollaborator collaborators={followersSuggestion} />
    </div>
  );
}

export default Home;
