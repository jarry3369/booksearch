import React from 'react'
import styled from 'styled-components';

type Props = {
    fetchedData:any;
}

const Divider = styled.hr`
    border-top: 1px solid rgba(210, 214, 218, 1);
`

// props.fetchedData.title.replace(/(<([^>]+)>)/ig,"")
// props.fetchedData.price
// props.fetchedData.discount  null == ""
// props.fetchedData.description.replace(/(<([^>]+)>)/ig,"")
// props.fetchedData.author

const BookList = (props: Props) => {
    const title = props.fetchedData.title.replace(/(<([^>]+)>)/ig,"")
    const description = props.fetchedData.description.replace(/(<([^>]+)>)/ig,"")
    const author = props.fetchedData.author.replace(/(<([^>]+)>)/ig,"")
    const price = props.fetchedData.price
    const discount = props.fetchedData.discount

    return (
    <>
        <img src={props.fetchedData.image} alt={`${title}_image`} />
        <b>{props.fetchedData.title.replace(/(<([^>]+)>)/ig,"")}</b>
        <p>{author}</p>
        <a href={props.fetchedData.link} rel="noreferrer" target="_blank">구매하기</a>
        {discount ? discount : price }
        <a>상세보기</a>
        <Divider />
    </>
  )
}

export default BookList