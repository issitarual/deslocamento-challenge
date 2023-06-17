import * as React from 'react'

type Props = {
  userId: string
}

const HomePage : React.FC<Props> = ({userId}) => {
  return(
    <p>Home</p>
  )

}

export default HomePage;