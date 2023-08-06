/// API Connection to save game score
function insertScoreApi(user_id, game_id, total_ronde, skor) {
    const data = {
        user_id,
        game_id,
        total_ronde,
        skor: skor,
    };
    fetch(`${process.env.REACT_APP_BE_URL}/rps/insert-score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error updating score:", error);
      });
  };

  export { insertScoreApi }

