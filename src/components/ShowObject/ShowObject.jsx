import React from 'react'

const ShowObject = ({games}) => {
  return (
    <div>
        <pre>{JSON.stringify(games, null, 2)}</pre>
    </div>
  )
}

export default ShowObject