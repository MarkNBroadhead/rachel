
export const applicationSetSuccess = () => {
  return {
    type: 'APPLICATION_SET_SUCCESS',
  };
}

export const applicationSetError = (error) => {
    return {
        type: 'APPLICATION_SET_ERROR',
        error
    };
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    };
}
