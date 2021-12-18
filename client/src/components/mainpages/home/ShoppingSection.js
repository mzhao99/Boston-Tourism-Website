import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Button } from './Button';

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 4rem 0rem;
  background: white;
`;

const Container = styled.div`
  padding: 3rem calc{{100vw -1300px} / 2};
  display: grid;
  grid-template-columns: 1fr 1fr !important;
  grid-template-rows: 800px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ColumnLeft = styled.div`
  padding: 1rem 2rem;
  order: ${({reverse}) => (reverse ? '1' : '2')};
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    order: ${({reverse}) => (reverse ? '2' : '1')};
    width: 0%;
  }

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;

    @media screen and (max-width: 768px){
      width: 0%;
      height: 0%;
    }
  }
`;

const ColumnRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 100px;
    margin-left: 50px;
    line-height: 1.4;
    padding: 1rem 2rem;
    order: ${({reverse}) => (reverse ? '2' : '1')};

    h1{
        margin-botton: 2rem;
        font-size: 50px;
    }

    p{
        margin-botton: 1rem;
        line-height: 1.5;
        font-size: 20px;
        font-family: 'DM Sans', sans-serif;
    }

    @media screen and (max-width: 768px){
        margin-left: 0;
        margin-right: 200px;
    }
`;


const ShoppingSection = ({heading, paragraphOne, paragraphTwo, buttonLabel, reverse, image, delay}) => {
  return (
      <Section>
          <Container>
              <ColumnLeft reverse={reverse} data-aos='zoom-out' data-aos-duration='800' data-aos-once='false' data-aos-once='true' data-aos-delay={delay}>
                <img src={image} alt='home'/>
              </ColumnLeft>
              <ColumnRight reverse={reverse} data-aos='fade-up' data-aos-duration='1000' data-aos-once='false' data-aos-once='true' data-aos-delay={delay}>
                <h1>{heading}</h1>
                <br/>
                <p>{paragraphOne}</p>
                <br/>
                <p>{paragraphTwo}</p>
                <br/>
                <Link to='/products' className='btn-mobile'>
                  <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
                    {buttonLabel}
                  </Button>
                </Link>
              </ColumnRight>

          </Container>
      </Section>
  )
}

export default ShoppingSection;
