import React from 'react';
import Header from '../includes/header'
import Footer from '../includes/footer'
import { Link as NavLink} from 'react-router-dom';
import renderHTML from 'react-render-html';
import Loading from "../component/loader";
import { getAllCategories } from '../services/api/api.service'

const fetch = require('node-fetch');


export default function Allcategories() {
    const [data, setdata] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        try {
            getAllCategories()
            .then(function (result) {               
                setdata(result.data.data)  
                setLoading(false)           
            })
           
        } catch(err) {
           console.log(err)
           setLoading(false)
          }
    },[])

    const categories = data.map(function(cat,i){
        if(cat.subcategories=='NULL'||cat.subcategories.length==0){
            return(
                null
            )
        }else{
        return (
            
                <div class="cate_listing" key={i}>
                    {console.log(cat)}
                    
                   
                <h2>{cat.name}</h2>
                <ul>    
                    {cat.subcategories.map((subcategory) =>                                              
                        <li><NavLink to={'/packages/' + subcategory.id}>{subcategory.name}</NavLink></li>                                        
                    )}
                </ul>
            </div>
            
        )}
    })
 
    return (
        <div>
            <Header />

            <div class="container_fluid">
                        <div class="banner"><img src={process.env.PUBLIC_URL + "/images/inner_banner.jpg"} alt="banner" /></div>
                </div>

            <div class="container-fluid gray relative_loading">
            {loading == true ? <Loading /> :  null }
                <div class="container">
                    <div class="find_category ">
                        {/* <div class="search_box">
                            <form action="">
                                <input value={search} type="search" name="find category" id="search_category" placeholder="search category" onChange={(e) => setSearch(e.target.value)} />
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </form>
                        
                        </div>

                        <ul>
                            {data.map(function(category, i){
                                if(category.name.search(search) >=0) {
                                    return ( <li key={i}>{category.name}</li> )
                                }                                
                            })}
          
                        </ul> */}

                        <div class="category_search_form" id="pop">
                            <h2>Add Category Details</h2>
                            <p>Please mention the exam category that are looking for.Also, provide some additoonal information about the exam (if acailable)</p>
                            <form action="">
                                <label for="exam_name">Name of Exam*:</label>
                                <input type="text" name="exam name" id="exam_name" />
                                <label for="conducted">Conducted by:</label>
                                <input type="text" name="conducted" id="conducted" />
                                <label for="format">Formate(Online/Ofline):</label>
                                <input type="text" name="format type" id="format" />
                                <label for="previous_paper_link">Link for Previous year Paper:</label>
                                <input type="text" name="previous paper" id="previous_paper_link" />
                                <label for="next_date_exam">Next Date for Exam:</label>
                                <input type="text" name="next_date_exam" id="next_date_exam" />
                                <label for="test_prep_material">Test Prep Material Needed by Date:</label>
                                <input type="text" name="test_prep_material" id="test_prep_material" />
                                <label for="exam_email">Email*:</label>
                                <input type="text" name="exam_email" id="exam_email" />
                                <input type="button" value="Submit" />
                            </form>
                        </div>

                        <div class="category_list ">
                            <div class="categorie">
                                <ul>

                                    {data.map((category, i) =>
                                        <li key={i}>
                                            <NavLink to={'/packages/' + category.id}>
                                                <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                                                <h2>{category.name}</h2>
                                                <p>{renderHTML(category.description)}</p>
                                            </NavLink>
                                        </li>
                                    )}


                                </ul>
                            </div>

                            <div class="international_test">
                                
                                {categories}

                            
                                
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
            <Footer />
        </div>
    )
}