import { useState } from 'react';
import { DEFAULT_GAME_SETTINGS } from './config';

import Game from './containers/Game';

import { Button } from 'antd';

import HowToPlayModal from './components/HotToPlayModal';
import SynopsisModal from './components/SynopsisModal';
import SettingsFormModal from './containers/SettingsFormModal';

function App() {

  const [ settings, setSettings ] = useState(DEFAULT_GAME_SETTINGS);
  const [ showSynopsis, setShowSynopsis ] = useState(false);
  const [ showHowToPlay, setShowHowToPlay ] = useState(false);
  const [ showSettings, setShowSettings ] = useState(false);

  const updateSettings = (values) => {
    setSettings(values);
    setShowSettings(false);
  }

  return (
    <div className="App overflow-auto">
      <h1 className="text-center font-Arvo text-3xl bold mt-3 mb-5">Mr. Robot</h1>
      
      <div className="flex justify-center mb-5">

        <Button
          title="Read the Game's Synopsis"
          children={'Synopsis'}
          onClick={() => {setShowSynopsis(!showSynopsis)}}
        />

        <Button
          title="Read directions on How to Play"
          children={'How to Play'}
          onClick={() => {setShowHowToPlay(!showHowToPlay)}}
        />

        <Button
          title="Change the game's settings"
          children={'Show Game Settings'}
          onClick={() => {setShowSettings(!showSettings)}}
        />

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
      />
    </div>
  );
}

export default App;
