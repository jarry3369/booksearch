import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import xIcon from '../icon_x.png'

const Term = (props:any) => {
    return(
        <TermContainer>
            <Selected>
                {props.terms.d_option === "d_titl" && "제목"}
                {props.terms.d_option === "d_auth" && "저자명"}
                {props.terms.d_option === "d_publ" && "출판사"}
            </Selected>
            <Input name="term" value={props.terms.inputs} readOnly />
            {/* <button onClick={()=>props.onRemove(props.terms.id)}>삭제</button> */}
        </TermContainer>
    )
}

const CreateTerms = (props:any) => {
    return (
        <CreateTermsArea>
        <div>
        <Selector name="d_option" id="d_option" value={props.d_option}  onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{ props.setD_option(e.target.value)}} >
            <option value="">선택해주세요</option>
            <option value="d_titl">제목</option>
            <option value="d_auth">저자명</option>
            <option value="d_publ">출판사</option>
        </Selector>
        <Input placeholder='검색어 입력' autoComplete={`off`} name="term" value={props.inputs} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{ props.setInputs(e.target.value) }} />
        </div>
        <AddBtn onClick={props.onCreate} >{`+ 검색조건 추가`}</AddBtn>
        </CreateTermsArea>
    );
}

const Popup = (props: any) => {

    const [ terms, setTerms ] = useState([])
    const [inputs, setInputs] = useState<string>("")
    const [d_option, setD_option] = useState<string>("")

    const nextId = useRef(0);
    const onCreate = () => {
        const term:any = {
            id: nextId.current,
            inputs,
            d_option,
        };
        if(inputs&&d_option !== "" ){
            setTerms(terms.concat(term));
            nextId.current += 1;
            setInputs("")
            setD_option("")
        }
    };
    const onRemove = (id:any) => {        
        setTerms(terms.filter((term:any) => term.id !== id));
    };

    const resetForm = () =>{
        setTerms([])
        setInputs("")
        setD_option("")
    }

  return (
      <>
        {props.showDetails && 
            <Container>
                <XImage src={xIcon} alt={`xIcon_Image`} />
                {terms && terms.map((term:any) => <Term terms={term} setInputs={setInputs} onRemove={onRemove} key={term.id} />)}
                {terms.length <= 2 && <CreateTerms d_option={d_option} setD_option={setD_option} inputs={inputs} setInputs={setInputs} onCreate={onCreate} />}
                <BtnArea>
                    <ResetBtn onClick={resetForm}>초기화</ResetBtn>
                    <SubmitBtn onClick={async()=>{
                        const detailParams:any = {}
                        terms.forEach((term:any)=> {
                            console.log('this term', term);

                            detailParams[term.d_option] ? detailParams[term.d_option] = `${detailParams[term.d_option]} ${term.inputs}` :
                            detailParams[term.d_option] = term.inputs
                        })
                        console.log(detailParams);

                        const newParams = { ...props.params, ...detailParams }
                        props.setParams(newParams)
                        
                    }}>검색하기</SubmitBtn>
                </BtnArea>
            </Container>
        }
      </>
  )
}

const Container = styled.div`
    padding: 2rem 1.5rem;
    position: absolute;
    width: 360px;
    left: 620px;
    top: 265px;
    background: #FFFFFF;
    box-shadow: 0px 4px 14px 6px rgba(151, 151, 151, 0.15);
    border-radius: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const TermContainer = styled.div`
    display: flex;
    margin-bottom:10px;
    align-items: center;
`
const BtnArea = styled.div`
    margin-top: 40px;
    display: flex;
    justify-items: center;
`
const CreateTermsArea = styled.div`
    display:flex;
    flex-direction: column;
    align-items: end;
`
const XImage = styled.img`
    cursor: pointer;
    position: absolute;
    right: 4%;
    top: 5%;
`

const AddBtn = styled.button`
    margin-top: 8px;
    cursor: pointer;
    height: 32px;
    padding: 5px 10px;

    width: 176px;
    color: #6D7582;
    font-size: 14px;
    color: #4880EE;
    background: #EAF3FE;
    border-radius: 4px;
    border:none;
`
const ResetBtn = styled.button`
    cursor: pointer;
    height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;

    color: #6D7582;
    font-size: 14px;

    background: #F2F4F6;
    border-radius: 8px;
    border:none;
`
const SubmitBtn = styled.button`
    cursor: pointer;
    height: 32px;
    margin-left:1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    
    color: #FFFFFF;
    font-size: 14px;

    background: #4880EE;
    border-radius: 8px;
    border:none;
`

const Input = styled.input`
    height:30px;
    margin-left:1rem;
    padding-left:8px;
    border:none;
    border-bottom: 1px solid #4880EE;
    font-size: 14px;
    font-weight: 500;
    
    &:focus {
        outline: none;
    }
`

const Selector = styled.select`
    height: 33px;
    width: 100px;
    border:none;
    border-bottom: 1px solid #D2D6DA;
    color: #353C49;
    font-size: 14px;
    font-weight: bold;
    &:focus {
        outline: none;
    }
    & > option{
        color: #8D94A0;
        font-size: 14px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    }
`
const Selected = styled.div`
    height: 33px;
    line-height:33px;
    padding-left:4px;
    width: 96px;
    border:none;
    border-bottom: 1px solid #D2D6DA;
    color: #353C49;
    font-size: 14px;
    font-weight: bold;
`

export default Popup