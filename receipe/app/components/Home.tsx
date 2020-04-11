import React, {
  useEffect, useState
}
  from 'react';
import Receipe from './Receipe';
import styles from './Home.css';

// export default class Home extends Component {
//   const ReqExample = "https://api.edamam.com/search?q=chicken&app_id=0a80c3a8&app_key=03c8611f5870f7bc17c4cf28e84825f0&from=0&to=3";
//   render() {
//     return (
//       <div>
//         <div className={styles.container} >
//           <div className={styles.addValue} >
//             <select>
//               <option value="income"> Income < /option>
//           < option value="expense" > Expense < /option> 
//          </select>
//                 <input type="number" min="0" />
//         </div> < button type="button" > Add < /button> 
//       </div> 
//     </div>);
//   }
// }

const Home = () => {
  const APP_KEY = '03c8611f5870f7bc17c4cf28e84825f0'
  const APP_ID = '0a80c3a8'
  // const ReqExample = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3`;
  const [r, setR] = useState([]);
  const [search, setSearch] = useState('');
  const [submitt, setSubmitt] = useState('chicken');


  useEffect(() => {
    getRecepies();
  }, [submitt])
  const getRecepies = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${submitt}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setR(data.hits);
  }

  const handleChange = (event) => {

    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(submitt);
    setSubmitt(search);
    console.log(submitt);
    setSearch('')
  }

  return (
    <div>
      <div className={styles.container}>
        <h1>
          GET RECIPES
        </h1>
        <form className="search-form" onSubmit={handleSubmit}>
          <input className="search-bar" value={search} onChange={handleChange}></input>
          <button className="search-button" type="submit">Search</button>
        </form>
        {r.map(rs => (<Receipe title={rs.recipe.label}
          calories={rs.recipe.calories} image={rs.recipe.image} ingreients={rs.recipe.ingredients} />))}
      </div>
    </div>
  )

}

export default Home