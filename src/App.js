import './App.css';
import Company from './components/company/choose-company';
import Value_Set from './value-set/value-set';



function App() {
// eslint-disable-next-line no-restricted-globals
  return (
    <div className="App">
      <header className="App-header border">
        <Company></Company>
          <div className="text">
            <a href="#" className='anchor'><p className='text'>Pormade</p></a>
            <a href="#" className='anchor'><p className='text'>DRZ</p></a>
          </div>
          <img class="logo-img" src='https://cdn.discordapp.com/attachments/1141361461516587098/1141400872669167626/logo_pormade_render_1.png'></img>
      </header>
    </div>
  );
}

export default App;
