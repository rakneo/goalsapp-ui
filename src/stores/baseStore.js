import { createContext, useReducer } from 'react';

const initialState = {
  isModalOpen: false,
};

const actions  = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case actions.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    default:
      return state;
  }
}

export const BaseStore = createContext({});


export const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

    const value = {
      isModalOpen: state.isModalOpen,
      openModal: () => dispatch({type: actions.OPEN_MODAL}),
      closeModal: () => dispatch({type: actions.CLOSE_MODAL}),
    }
  return (
    <BaseStore.Provider value={value}>
      {children}
    </BaseStore.Provider>
  )
}




