export const noDog = () => {
    return async (dispatch) => {
    dispatch({type: 'NO_DOG', payload: true})
    }
}