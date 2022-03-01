import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import axios from 'axios'

import searchIcon from './icon_search.png'

import NoResult from 'components/NoResult';
import BookList from './components/BookList';
import Pagination from 'components/Pagination';
// import fetchAPI from './util/fetchAPI'

function App() {
  const [ start, setStart ] = useState<number>(1);
  
  const [ params, setParams ] = useState<any>({
    query:"",
    display: 10,
    start:1,
  },);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)

  const [ fetchedData, setFetchedData ] = useState<any>([]);

  useEffect(() => {
    const lastPage = Math.ceil(fetchedData.total / 10);
    setTotalPage(lastPage ? lastPage : 1);    
  }, [fetchedData]);

  useEffect(()=> {
    console.log('currentPage : ',currentPage);
    setParams({
      ...params,
      start: start
    })
  },[currentPage])

  useEffect(()=> {
    if(params.query === "")return;
    else(
      fetchAPI()
    )
  },[params])

  const fetchAPI = async () => {
    try {
      
      const res = await axios.get('https://jarry3369-cors-proxy.herokuapp.com/https://openapi.naver.com/v1/search/book.json', {
          params,
          headers:{
              'Content-Type': 'application/json',
              'X-Naver-Client-Id': `${process.env.REACT_APP_CLIENTID}`,
              'X-Naver-Client-Secret': `${process.env.REACT_APP_CLIENTSECRET}`,
          },
      })
      setFetchedData(res.data)

    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
      <Header>30COS Books</Header>
      <Wrapper>
        <h2 style={{paddingTop:'5rem'}}>도서 검색</h2>
        <SearchContainer>
          <SearchBarContainer>
            <img src={searchIcon} alt='serchIcon'/>
            <SearchBar onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {       
              if(e.key === 'Enter' && e.currentTarget.value !== ''){
                setParams({
                  ...params,
                  query:e.currentTarget.value
                })
              }              
            }}
          placeholder='검색어 입력' />
          </SearchBarContainer>
          <button>상세검색</button>
        </SearchContainer>

        <p>도서 검색 결과 총 {fetchedData.total ? fetchedData.total : 0 }건</p>

          {fetchedData.length === 0 || fetchedData.total === 0 ? <NoResult/> : 
           fetchedData.items.map((item:any, index:any)=>{
            return (
            <BookList fetchedData={item} indexNum={index} key={`${item.title}${index}`} />
            )
          }) }

          {fetchedData.total > 0 && (
            <Pagination
              totalPage={totalPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setStart={setStart}
            />
          )}
      </Wrapper>
    </>
  );
}

const Header = styled.p`
  height: 1rem;
  padding: 1.5rem;
  padding-left: 24rem;
  color: rgba(26, 30, 39, 1);
  font-size: 22px;
  background: rgba(234, 243, 254, 1);
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin :0;
`

const Wrapper = styled.div`
  margin-left: 24rem;
  margin-right: 24rem;
  margin-bottom : 2rem;
`

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const SearchBarContainer = styled.div`
  padding: 0.1rem;
  padding-left: 1rem;
  width: 35%;
  height: 4vh;
  line-height: 4vh;
  border: none;
  border-radius: 50px;
  background-color: rgba(242, 244, 246, 1);
`

const SearchBar = styled.input`
  width:85%;
  border: none;
  border-radius: 8px;
  background-color: rgba(242, 244, 246, 1);
  padding-left: 10px;

  &:focus{
    outline: none;
  }
`

export default App;
