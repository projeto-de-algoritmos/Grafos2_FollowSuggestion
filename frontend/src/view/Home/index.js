import React from "react";
import "./styles.scss";
import collaboratorsJSON from "../../contributors.json";
import suggestion from "../../logic/suggestion";
import { ListCollaborator } from "../../components/ListCollaborator";

import { Autocomplete, TextField, Alert } from "@mui/material";

function Home() {
  const [followersSuggestion, setFollowersSuggestion] = React.useState([]);
  const [collaborator, setCollaborator] = React.useState("");

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
      <p className="title-suggestion">Sugestões</p>
      <div className="input-area">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={collaboratorsJSON.map((collaborator) => collaborator.login)}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Username" />}
          onSelectCapture={handleCollaborator}
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
