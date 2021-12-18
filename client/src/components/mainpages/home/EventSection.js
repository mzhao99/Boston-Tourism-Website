import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Button } from './Button';

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 12rem 0rem;
  display: flex;
  flex:direction: column;
  justify-content: center;
  background: #242424;
`;

const Container = styled.div`
  background: #fff;
  padding: 3rem 2rem;
  position: relative;
  width: 100%;
`;

const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Content = styled.div`
  flex: 0 0 50%;

  @media screen and (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-top: 250px;
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 50px;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.5;
    font-size: 20px;
    font-family: 'DM Sans', sans-serif;
  }
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px -15px;
  justify-content: flex-start;
  padding: 1rem;
  font-family: 'Dancing Script', cursive;
  .btn{
    @media screen and (max-width: 768px) {
      width: 35%;
    }
  }
`;

const ColumnRight = styled.div`
  position: absolute;
  top: -110px;
  right: 0;
  max-width: 850px;
  height: 160%;
  width: 50%;
  padding-left: 1rem;

  img{
    height: 100%;
    width: 100%;
    object-fit: cover;

    @media screen and (max-width: 768px){
      width: 0%;
      height: 0%;
    }
  }

  @media screen and (max-width: 768px) {
    height: 320px;
    top: -65px;
    width: 80%;
    margin: 0 auto;
    left: 0;
  }
`;


const EventSection = ({heading, paragraphOne, paragraphTwo, buttonLabel, reverse, image, delay}) => {
  return (
      <Section>
          <Container>
              <Wrap>
                <ColumnLeft>
                  <Content data-aos='fade-right' data-aos-duration='1200' data-aos-delay='300' data-aos-once='true' data-aos-anchor-placement='center bottom'>
                    <h1>{heading}</h1>
                    <p>{paragraphOne}</p>
                    <p>{paragraphTwo}</p>
                    <Link to='/events' >
                      <Button className='btn' buttonStyle='btn--outline' buttonSize='btn--large'>
                        {buttonLabel}
                      </Button>
                    </Link>
                  </Content>
                </ColumnLeft>
                <ColumnRight>
                  <img src={image} alt='home' data-aos='zoom-out' data-aos-duration='800' data-aos-once='true' data-aos-delay={delay}/>
                </ColumnRight>
              </Wrap>
          </Container>
      </Section>
  )
}

export default EventSection;
