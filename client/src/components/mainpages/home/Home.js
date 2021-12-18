import React from 'react';
import './App.css';
import HeroSection from './HeroSection';
import Footer from './Footer';
import EventSection from './EventSection';
import ShoppingSection from './ShoppingSection';
import {ShoppingData} from './InfoData';
import {EventData} from './InfoData';

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventSection {...EventData}/>
      <ShoppingSection {...ShoppingData}/>
      <Footer />
    </>
  );
}