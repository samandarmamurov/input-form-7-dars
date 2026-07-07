import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import { useState } from 'react'
import CartModal from '../components/CartModal'
function Home() {
  let [show, setShow]=useState(true)
  return (
    <>
      <Header></Header>
      <CartModal/>
      <Main></Main>
      <Footer></Footer>
    </>
  )
}

export default Home
