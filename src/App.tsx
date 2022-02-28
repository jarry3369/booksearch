import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import axios from 'axios'

import searchIcon from './icon_search.png'

import NoResult from 'components/NoResult';
import BookList from './components/BookList';
// import fetchAPI from './util/fetchAPI'

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

const GridView = styled.div`
  min-height: 50vh;
  display: grid;
`

function App() {
  const [ fetchedData, setFetchedData ] = useState<any>([]);


  const fetchAPI = async (searchTerm:any,) => {
    try {      
      const params = {query:'UTF-8'};
  
      const res = await axios.get('https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/book.json', {
          method:'GET',
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
              if(e.key === 'Enter'){
                fetchAPI(e.currentTarget.value)
              }
            }}
          placeholder='검색어 입력' />
          </SearchBarContainer>
          <button>상세검색</button>
        </SearchContainer>

        <p>도서 검색 결과 총 {fetchedData.display ? fetchedData.display : 0 }건</p>

        <GridView>
          {/* {fetchedData.length > 0 ? <BookList fetchedData={fetchedData} /> : <NoResult/>} */}
        </GridView>
      </Wrapper>
    </>
  );
}

export default App;
