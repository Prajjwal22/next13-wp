import { getPalette } from "./getPalette"

const initialState = {
  loading: true,
  data: {},
  error: undefined
}

function reducer(state, action) {
  switch (action.type) {
    case "getPalette":
      return initialState
    case "resolvePalette":
      return { ...state, data: action.payload, loading: false }
    case "rejectPalette":
      return { ...state, error: action.payload, loading: false }
  }
}

export function usePalette(src) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    dispatch({ type: "getPalette" })

    getPalette(src)
      .then(palette => {
        dispatch({ type: "resolvePalette", payload: palette })
      })
      .catch(ex => {
        dispatch({ type: "rejectPalette", payload: ex })
      })
  }, [src])

  return state
}
