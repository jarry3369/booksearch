import React from 'react'
import styled from 'styled-components'

import bookIcon from '../icon_book.png'

const Wrapper = styled.div`
    display: grid;
    place-content: center;
    justify-items: center;
`

type Props = {
}

const NoResult = (props: Props) => {

  return (
    <Wrapper>
        <img src={bookIcon} alt='bookIcon' />
        <p>검색된 결과가 없습니다.</p>
    </Wrapper>
  )
}

export default NoResult