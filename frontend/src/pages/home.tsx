import React, { useState } from 'react';
import { Container, Input } from "reactstrap";
import { IconButton } from '@fluentui/react/lib/Button';
import { downloadFunction } from '../components/button_function';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LoadingButton from '@mui/lab/LoadingButton';
import PreviewBoxSnippet from '../components/preview_box';
import '../style/home.css';


const HomePage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [downloadUrlList, setDownloadUrlList] = useState<string[]>([]);

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
              onClick={() => downloadFunction(inputText, downloadUrlList, setDownloadUrlList, setLoading)}
              loading={loading}
              className={loading ? 'submitbutton-loading' : 'submitbutton'}>
              Submit
            </LoadingButton>
          </div>
          </Container>
        </div>
          <PreviewBoxSnippet title='Preview' pdfURLlist={downloadUrlList} />
      </>
    );
};

export default HomePage;
