import React, { useState } from 'react';
import { Container, Button, Input } from "reactstrap";
import { IconButton } from '@fluentui/react/lib/Button';
import axios from 'axios';
import { downloadFunction } from '../components/button_function';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LoadingButton from '@mui/lab/LoadingButton';

import './home.css';


interface PdfDownloaderProps {
  url: string;
  downloadUrl: string;
  inputText: string;
  loading: boolean;
}

const PdfDownloader: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  return (
      <>
      <IconButton onClick={toggleDarkMode} color="inherit">
        {darkMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
        <p className='titletext'> DownloadTheDocs</p>
        <div className='homebox'>
          <Container className='center-container'>
          <div>
            <Input 
              type="text" 
              value={inputText} 
              onChange={e => setInputText(e.target.value)} 
            />
          </div>
          <div className='button-container'>
            <LoadingButton
              onClick={() => downloadFunction(inputText, setLoading)}
              loading={loading}
              className={loading ? 'submitbutton-loading' : 'submitbutton'}>
              Submit
            </LoadingButton>
          </div>
          </Container>
        </div>
        <div className='bottom-container'>
        <div className='box'>
          <p>Text 1</p>
        </div>
        <div className='box'>
          <p>Text 2</p>
        </div>
        <div className='box'>
          <p>Text 3</p>
        </div>
        <div className='box'>
          <p>Text 4</p>
        </div>
        <div className='box'>
          <p>Text 5</p>
        </div>
      </div>
      </>
    );
};

export default PdfDownloader;
