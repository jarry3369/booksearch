import React, { useState, Dispatch, SetStateAction } from 'react'
import axios from 'axios'

const fetchAPI = async (searchTerm:string,) => {
  try {
    const params = {query: searchTerm};

    const res = await axios.get('https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/book.json', {
        method:'GET',
        params,
        headers:{
            'Content-Type': 'application/json',
            'X-Naver-Client-Id': `${process.env.REACT_APP_CLIENTID}`,
            'X-Naver-Client-Secret': `${process.env.REACT_APP_CLIENTSECRET}`,
        },
    })
    // console.log('res in func', res.data);
    // console.log('1,',searchTerm);
    
    return res.data

  } catch (error) {
      console.log(error);
  }
}

export default fetchAPI;