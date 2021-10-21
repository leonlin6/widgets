import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {
    const [term , setTerm] = useState('car');
   // const [termTwo , setTermTwo] = useState('');
    const [results, setResults] = useState([]);


    const onChangeEvent = event => {
        setTerm(event.target.value);

    }

    // console.log('I run with every render');

    useEffect( () => {

        const search = async ()=>{
            console.log('I ran setResults');
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params:{
                    action: 'query',
                    list:'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,
                }
            });

            setResults(data.query.search);
        };
        
        if(term && !results.length){
            search();
        }else{
            const timeoutId = setTimeout(() => {
                if(term){
                    search();
                }
           }, 5000);
    
            return () => {
                clearTimeout(timeoutId);
            }
        }



    }, [term]);

    const renderedResults = results.map(
        (result) => {
            return(
                <div key={result.pageid} className="item">
                    <div className="right floated content">
                        <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>
                            GO
                        </a>
                    </div>
                    <div className="container">
                        <div className="header">
                            {result.title}
                        </div>
                        <span dangerouslySetInnerHTML={{__html:result.snippet}}></span>
                    </div>
                </div>
            );
        });

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Here</label>
                    <input 
                        value={term} 
                        onChange={onChangeEvent}
                        className="input"
                    ></input>
                </div>
            </div>
            <div className="ui celled list">{renderedResults}</div>
        </div>
    )
}


export default Search;