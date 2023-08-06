const stateAwal = {
    round: 0,
    score: 0
}
  
export function reducer (
    state = stateAwal,
    action
) {
switch(action.type) {
    case "UPDATE_ROUND":
        return { ...state, round: action.payload }
    case "UPDATE_SCORE":
        return { ...state, score: action.payload }
    default:
        return state
}
}