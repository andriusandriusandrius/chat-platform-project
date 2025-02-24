import { useState } from 'react'
import LoginSection from './components/LoginSection.jsx'
import WriteMessageSection from './components/WriteMessageSection.jsx'
import Header from './components/Header.jsx'
import './App.css'

function App() {
let [ws, Setws] = useState(null);
let [loginName, SetLoginName] = useState("");
  return (
    <>
      <Header/>
      <main>
      
      <WriteMessageSection
        getWs = {ws}
        loginName = {loginName}
      />
      <LoginSection
        Setws ={Setws}
        SetLoginName = {SetLoginName}
        loginName = {loginName}
      />
      </main>
    </>
  )
}

export default App
