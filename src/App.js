import {React, useState, useEffect} from 'react'
import Products from './components/Products/Products'
import Navbar from './components/Navbar/Navbar'

import axios from 'axios'
import SearchBar from "material-ui-search-bar";

import { MDBCol, MDBRow, MDBPagination, MDBPaginationLink, MDBPaginationItem, MDBBtn} from 'mdb-react-ui-kit'
import { RepeatRounded, SettingsSystemDaydreamTwoTone } from '@material-ui/icons'

function App() {
    const [products,setProducts] = useState([]);
    const [value,setValue] = useState("")
    const [sortValue,setSortValue] = useState("");
    const [currentPage, setCurrentPage] = useState(0)
    const [pageLimit, setPageLimit] = useState(4)
    const [filterSortValue, setFilterSortValue] = useState("")
    const [operation,setOperation] =useState("")

    const sortOptions = ["name", "id","price", "category"];

    useEffect(()=> {
        loadUsersData(0,4,0,operation);
    },[])
    
    const loadUsersData = async (
        start,
        end,
        increase, 
        optType=null, 
        filterorSortValue
        ) => {
            switch (optType) {
                case "search":
                    setOperation(optType);
                    setSortValue("");
                    return await axios.get(`http://localhost:5000/products?name=${value}&_start=${start}&_end=${end}`)
                    .then((response)=> {
                        setProducts(response.data);
                        setCurrentPage(currentPage + increase);
                    })
                    .catch((err) => console.log(err));
                case "sort":
                    setOperation(optType);
                    setFilterSortValue(filterorSortValue);
                    return await axios
                    .get(`http://localhost:5000/products?_sort=${filterorSortValue}&_order=asc&_start=${start}&_end=${end}`)
                    .then((response) => {
                        setProducts(response.data);
                        setCurrentPage(currentPage + increase);
                    })
                default : 
                    return await axios.get(`http://localhost:5000/products?_start=${start}&_end=${end}`)
                    .then((response)=> {
                        setProducts(response.data);
                        setCurrentPage(currentPage + increase)
                    })
                    .catch((err) => console.log(err));
            }
        
        
    }
    const handleSearch = async (e) => {
        // e.preventDefault();
        loadUsersData(0,4,0,"search")
        // return await axios.get(`http://localhost:5000/products?name=${value}`)
        // .then((response)=> {
        //     setProducts(response.data);
        //     setValue("");
        //     })
        // .catch((err) => console.log(err));
    }

    const handleSort = async (e) => {
        let value = e.target.value;
        setSortValue(value);  
        loadUsersData(0,4,0,"sort",value);
        // return await axios
        // .get(`http://localhost:5000/products?_sort=${value}&_order=asc`)
        // .then((response) => {
        //     setProducts(response.data);
        // })
    }

    const renderPagination = () => {
        if(products.length <4 && currentPage ===0 ) return null;
        if(currentPage === 0){
            return(
                <MDBPagination className='mb-0'>
                    <MDBPaginationItem>
                        <MDBPaginationLink>
                            1
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick = {()=> loadUsersData(4,8,1,operation,filterSortValue)}>Next</MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }
        else if(currentPage<pageLimit-1 && products.length === pageLimit){
            return(
                <MDBPagination className='mb'>
                    <MDBPaginationItem>
                        <MDBBtn onClick = {()=> loadUsersData((currentPage - 1)*4,currentPage*4,-1, operation,filterSortValue)}>Prev</MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>
                            {currentPage + 1}
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick = {()=> loadUsersData((currentPage + 1)*4,(currentPage + 2)*4,1,operation,filterSortValue)}>Next</MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }
        else{
            return(
                <MDBPagination className='mb-0'>
                    <MDBPaginationItem>
                        <MDBBtn onClick = {()=> loadUsersData((currentPage - 1)*4,currentPage *4,-1,operation,filterSortValue)}>Prev</MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>
                            {currentPage + 1}
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                    </MDBPagination>
            )
        }
    }

    //console.log(products);

  return (
    <div>
        <Navbar/>
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
                paddingTop: "5vw"
            }}  
        >
            <SearchBar
                value={value}
                onChange={(event, value) => setValue(event)}
                onRequestSearch={() => handleSearch(value)}
            />
        </div>
        <Products products={products}/>
        <MDBRow>
            <MDBCol size="8">
                <h5>Sort By:</h5>
                <select
                    styles={{width: "50%", borderRadius: "2px", height: "35px"}}
                    onChange={handleSort}
                    value={sortValue}
                    >
                        <option>Please select value</option>
                        {sortOptions.map((item,index) => (
                            <option value={item} key={index}>
                                    {item}
                            </option>
                        ))}
                </select>
            </MDBCol>
        </MDBRow>
        <div
        style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center"
        }}  
        >
            {renderPagination()}
        </div>
    </div>
  )
}

export default App