import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import styles from './App.module.css'
import './global.css'
import { Post } from './Post'

function App() {
  return (
    <div>
      <Header />
      
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post 
            author="Diego Fernandes"
            content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat ea neque dolor reiciendis, porro quos, nostrum cumque rem consequuntur sint commodi rerum tempore corrupti, a labore alias voluptatibus! Sapiente, eius!"
          />      
          <Post 
            author="Yago Ferreira"
            content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat ea neque dolor reiciendis, porro quos, nostrum cumque rem consequuntur sint commodi rerum tempore corrupti, a labore alias voluptatibus! Sapiente, eius!"
          />     
        </main>
      </div>
    </div>
  )
}

export default App