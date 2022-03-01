import styled from "styled-components";

type Props = {
    page:number;
    setCurrentPage:any;
    isActive:boolean;
    setStart:any;
}

export default function PageButton({ page, setCurrentPage, isActive, setStart,}:Props) {
  console.log(isActive);
  
    const handleClickButton = () => {
      setCurrentPage(page);
      setStart((page-1)*10+1);
    };
  
    return (
      <Container >
        <Button onClick={handleClickButton} >
          {page}
         </Button>
       </Container>
    );
  }

const Container = styled.div`
`
const Button = styled.button`

`