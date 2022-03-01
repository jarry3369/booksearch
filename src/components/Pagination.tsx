import React, { useEffect, useState } from 'react';
import { start } from 'repl';
import styled from 'styled-components';
import PageButton from './PageButton';

type Props = {
    totalPage:number;
    currentPage:number;
    setCurrentPage:any;
    setStart:any;
}

const PPL = 5;

export default function Pagination({ totalPage, currentPage, setCurrentPage, setStart, }:Props) {
  const [showPages, setShowPages] = useState<any>({
    start: 1,
    end: PPL,
  });

  const backwardHandler = () => {
    if(currentPage > PPL){
        setShowPages({
            ...showPages,
            start:showPages.start-PPL,
            end:showPages.start-1,
        });
        setCurrentPage(showPages.start)
        setStart((showPages.start-1)*10+1);
    }
  }

  const fowardHandler = () => {
    if(showPages.start+PPL <= totalPage){
        if(showPages.end+PPL >= totalPage){
        setShowPages({
            ...showPages,
            start: showPages.start+PPL,
            end: showPages.end+(totalPage%PPL),
            });
        }else {
            setShowPages({
                ...showPages,
                start: showPages.start+PPL,
                end: showPages.end+PPL,
            });
        }

        setCurrentPage(showPages.start);
        setStart((showPages.start-1)*10+1);
    }
  }

//   const changePageNumbersBackward = () => {
//     currentPage > PPL &&
//       setShowPages(prev => arrowHandler(prev, -1, totalPage));
//   };

//   const changePageNumberForward = () => {
//     showPages.end <= totalPage &&
//       setShowPages(prev => arrowHandler(prev, 1, totalPage));
//   };

  const getNumArray = (startN:number,endN:number) => {      
    if(endN > 1 ){
        const res = []
        for(var i = startN; i<=endN; i++){
            res[i-1] = i;
        }return res;
    }else if(endN === 1){
        return [1];
    }
  }

  useEffect(() => {
    const lessThanFive = totalPage <= PPL;
    lessThanFive
      ? setShowPages((prev:any) => ({ ...prev, start: 1, end: totalPage }))
      : setShowPages((prev:any) => ({ ...prev, start: 1, end: PPL }));
  }, [totalPage]);

  useEffect(() => {
    setCurrentPage(showPages.start);
  }, [showPages, setCurrentPage]);

  const pages = getNumArray(showPages.start, showPages.end);

  return (
    <Container>
      <button onClick={backwardHandler} >{`<`}</button>
      {pages && pages.map((page:number, index:number) => {
          
        return (
          <PageButton
            key={`pageNumber${index + 1}`}
            page={page}
            setCurrentPage={setCurrentPage}
            isActive={page === currentPage}
            setStart={setStart}
          />
        );
      })}
      <button onClick={fowardHandler} >{`>`}</button>
    </Container>
  );
}

const Container = styled.div`
    display:flex;
    justify-content: center;
    padding-top: 1rem;
`