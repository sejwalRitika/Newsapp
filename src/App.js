import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import './App.css';
import Nabvar from './components/Nabvar';
import News from './components/News';
const  App =()=>{
const pageSize = 5;  
const [progress, setProgress] = useState(0)

return(
<div>
<Nabvar/>
<LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      /> 
<News setProgress={setProgress}pageSize={pageSize} country="in" category="Entertainment"/>
</div>
)
}
export default App;
