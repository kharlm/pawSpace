export const guest = () => {
    

    return async (dispatch) => {
    dispatch({type: 'GUEST', payload: true})
    }
}