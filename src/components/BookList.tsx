import React, { useRef, useState, useCallback } from 'react'
import styled from 'styled-components';

type Props = {
    fetchedData:any;
    indexNum:any;
}

// props.fetchedData.title.replace(/(<([^>]+)>)/ig,"")
// props.fetchedData.price
// props.fetchedData.discount  null == ""
// props.fetchedData.description.replace(/(<([^>]+)>)/ig,"")
// props.fetchedData.author

const BookList = (props: Props) => {
    const [buttonText, setButtonText] = useState<string>("상세보기 ˅")

    const title = props.fetchedData.title.replace(/(<([^>]+)>)/ig,"")
    const description = props.fetchedData.description.replace(/(&#x0D;)/ig,`\n`).replace(/(<([^>]+)>)/ig,"").replace(/(&lt;)/ig,`<`).replace(/(&gt;)/ig,`>`)
    const author = props.fetchedData.author.replace(/(<([^>]+)>)/ig,"")
    const price = props.fetchedData.price
    const discount = props.fetchedData.discount
    
    const parentRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [isCollapse, setIsCollapse] = useState(false);

    const buttonClickHandler = useCallback(
        (e) => {
        e.stopPropagation();

        if (parentRef.current === null || childRef.current === null || headerRef.current === null) {
            return;
        }
        if (parentRef.current.clientHeight > 0) {
            parentRef.current.style.height = "0"
            headerRef.current.style.height = "120px"
            headerRef.current.style.opacity = "100"
            setButtonText("상세보기 ˅")
        } else {
            parentRef.current.style.height = `auto`
            headerRef.current.style.height = "0"
            headerRef.current.style.opacity = "0"
            setButtonText("상세보기 ^")
        }
        setIsCollapse(!isCollapse);
        },
        [isCollapse]
    );

    return (
    <>
      <Container>
        <Header ref={headerRef}>
          <HeaderContent>
            <HeaderBookImage src={props.fetchedData.image} alt={`${title}_Image`} />
            <HeaderBookTitle>{title}</HeaderBookTitle>
            <HeaderBookAuthor>{author}</HeaderBookAuthor>
            <BookPrice>{discount ? (discount*1).toLocaleString('ko-KR') : (price*1).toLocaleString('ko-KR') }원</BookPrice>

            <BtnArea>
              <a href={props.fetchedData.link} rel="noreferrer" target="_blank">
                <TitleBuyBtn>구매하기</TitleBuyBtn>
              </a>
              <DetailBtn onClick={buttonClickHandler} >{buttonText}</DetailBtn>
            </BtnArea>
          </HeaderContent>
        </Header>
        <ContentsWrapper ref={parentRef}>
            <Contents ref={childRef}>

              <BookImage src={props.fetchedData.image} alt={`${title}_Image`} />
              
              <BookInfo>
                <TitleAuthor>
                  <BookTitle>{title}</BookTitle>
                  <BookAuthor>{author}</BookAuthor>
                </TitleAuthor>
                <BookDescLabel>책 소개</BookDescLabel>
                <BookDesc>{description}</BookDesc>
              </BookInfo>
              
              
              <ETCs>
                <DetailBtn onClick={buttonClickHandler} >{buttonText}</DetailBtn>

                <PriceArea>
                {
                  discount ? (
                      <>
                      <Price>
                        <PriceLabel>원가</PriceLabel>
                        <DelPrice>{(price*1).toLocaleString('ko-KR')}원</DelPrice>
                      </Price>
                      <Price>
                        <PriceLabel>할인가</PriceLabel>
                        <BookPrice>{(discount*1).toLocaleString('ko-KR')}원</BookPrice>
                      </Price>
                      </>
                  ):(
                    <>
                    <Price>
                      <PriceLabel>원가</PriceLabel>
                      <BookPrice>{(price*1).toLocaleString('ko-KR')}원</BookPrice>
                    </Price>
                    </>
                  )
                }
                
                </PriceArea>
                <a href={props.fetchedData.link} rel="noreferrer" target="_blank">
                  <BuyBtn>구매하기</BuyBtn>
                </a>
              </ETCs>
              
              
            </Contents>
        </ContentsWrapper>
      </Container>
      <Divider />
    </>
  )
}

const Divider = styled.hr`
    border-top: 1px solid rgba(210, 214, 218, 1);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
`

const ContentsWrapper = styled.div`
  height: 0px;
  width: inherit;
  padding: 0 8px;
  overflow: hidden;
  transition: all 0.35s ease;
`

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0;
  align-items: center;
  justify-content: center;
`

const BookInfo = styled.div`
  margin-left: 3rem;
  display:flex;
  flex-direction: column;
  width:60%;
  justify-content: start;
`

const Header = styled.div`
  height: 120px;
  overflow: hidden;
  transition: all 0.35s ease;
`
const HeaderContent = styled.div`
  display:flex;
  align-items: center;

  &> *{
    margin-left: 2%;
  }
`
const HeaderBookTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #353C49;
  max-width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const BookTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #353C49;
  max-width: 75%;
`

const BookAuthor = styled.p`
  font-size: 14px;
  color: #8D94A0;
  min-width:10%;
  margin-left: 2%;
`
const HeaderBookAuthor = styled.p`
  font-size: 14px;
  color: #8D94A0;
  min-width:10%;
  margin-left: 2%;
  max-width: 14%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const BookPrice = styled.p`
  margin: 0 0 0 auto;
  font-size: 18px;
  font-weight: bold;
  color: #353C49;
  min-width:8%;
  text-align:right;
`
const HeaderBookImage = styled.img`
  width: 82px;
  height:122px
`

const BookImage = styled.img`
  width: 200px;
  height:264px;
`

const BookDescLabel = styled.h4`
  font-size: 16px;
  margin-bottom: 0px;
`

const BookDesc = styled.pre`
  line-height: 16px;
  font-size: 12px;
  color: #353C49;
  white-space: pre-wrap;
`

const BtnArea = styled.div`
  width:23%;
  margin-left: 5%;
  display:flex;
`
const DetailBtn = styled.button`
  cursor: pointer;
  width: 115px;
  height: 48px;
  border: none;
  border-radius: 8px;
  color: #6D7582;
  margin-left: 6%;
`
const TitleBuyBtn = styled.button`
  cursor: pointer;
  width: 115px;
  height: 48px;
  border: none;
  border-radius: 8px;
  background: #4880EE;
  color: #FFFFFF;
  margin-left: 6%;
`

const BuyBtn = styled.button`
  cursor: pointer;
  width: 240px;
  height: 48px;
  border: none;
  border-radius: 8px;
  background: #4880EE;
  color: #FFFFFF;
  margin-left: 2%;
`

const TitleAuthor = styled.div`
  display:flex;
  align-items: center;
`

const ETCs = styled.div`
  width:40%;
  display:flex;
  flex-direction: column;
  align-items: end;
`

const PriceArea = styled.div`
  display:flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  height: 140px;
  margin-bottom: 28px;
`

const DelPrice = styled.p`
  margin-left: auto;
  font-size: 18px;
  color: #353C49;
  text-decoration:line-through;
  margin : 0;
`
const PriceLabel = styled.h4`
  font-size: 10px;
  color: #8D94A0;
  margin-right: 8px;
`

const Price = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
`

export default BookList