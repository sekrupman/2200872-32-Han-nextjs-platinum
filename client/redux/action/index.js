export function updateRound(round) {
    return {
      type: 'UPDATE_ROUND',
      payload: round
    }
  }
  
  export function updateScore(score) {
    return {
      type: 'UPDATE_SCORE',
      payload: score
    }
  }