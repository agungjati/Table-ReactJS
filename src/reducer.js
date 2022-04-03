export const SET_DATA = 'SET_DATA'
export const FILTER_DATA = 'FILTER_DATA'

export const  reducer = (state, action) => {
    switch (action.type) {
      case SET_DATA : {
        const data = Object.assign({}, state, { 
          data: action.payload.data, 
          isLoading: action.payload.isLoading
        })
        return data
      }
      case FILTER_DATA : {
        const data = Object.assign({}, state, action.payload)
        return data
      }
      default:
        return state
    }
  }