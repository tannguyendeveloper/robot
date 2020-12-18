import { useState } from 'react';
import { DEFAULT_GAME_SETTINGS } from './config';

import Game from './containers/Game';

import { Button } from 'antd';
import {IoSettingsOutline} from 'react-icons/io5';

import HowToPlayModal from './components/HotToPlayModal';
import SynopsisModal from './components/SynopsisModal';
import SettingsFormModal from './containers/SettingsFormModal';

import './App.css';

function App() {

  const [ settings, setSettings ] = useState(DEFAULT_GAME_SETTINGS);
  const [ showSettings, setShowSettings ] = useState(false);
  const [ isSettingsDisabled, setIsSettingsDisabled ] = useState(false);

  const [ showSynopsis, setShowSynopsis ] = useState(false);
  const [ showHowToPlay, setShowHowToPlay ] = useState(false);

  const updateSettings = (values) => {
    setSettings(values);
    setShowSettings(false);
  }

  return (
    <div className="App overflow-auto min-h-screen">
      <div className="flex items-center content-center flex-col xs:mx-2 xs:flex-row xs:justify-between mb-3">
        <h1 className="text-center font-Luckiest-Guy text-3xl md:text-4xl bold mt-3 mb-3 text-cyan-aqua-200">Mr. Robot</h1>
        <div classNane="xs:-mx-5">
        <Button
          title="Read the Game's Synopsis"
          children={'Synopsis'}
          onClick={() => {setShowSynopsis(!showSynopsis)}}
          className="mx-1"
        />

        <Button
          title="Read directions on How to Play"
          children={'How to Play'}
          onClick={() => {setShowHowToPlay(!showHowToPlay)}}
          className="mx-1/2"
        />

        <Button
          title="Change the game's settings"
          children={'Show Game Settings'}
          onClick={() => {setShowSettings(!showSettings)}}
          disabled={isSettingsDisabled}
          shape="circle"
          className="ml-1 mr-0 inline-flex items-center align-center content-center justify-center justify-items-center"
        >
          <IoSettingsOutline />
        </Button>
        </div>
      </div>

      { showSynopsis
        ? <SynopsisModal
            visible={showSynopsis}
            onCancel={ ()=>{setShowSynopsis(false)}}
          />
        : null }

      { showHowToPlay
        ? <HowToPlayModal
            visible={showHowToPlay}
            onCancel={()=>{setShowHowToPlay(false)}}
          />
        : null }
            
      { showSettings 
        ? <SettingsFormModal
            visible={showSettings}
            defaultSettings={settings}
            onOk={updateSettings}
            onCancel={()=>{setShowSettings(false)}}
            settings={settings}
          /> 
        : null 
      }
      
      <Game 
        settings={settings}
        setIsSettingsDisabled={setIsSettingsDisabled}
      />
    </div>
  );
}

export default App;
