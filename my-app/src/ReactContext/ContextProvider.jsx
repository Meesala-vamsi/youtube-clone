import React,{useState} from 'react'
import ReactContext from './Context';

const ContextProvider=({children})=>{
    const [getSidebar,setSidebar] = useState(true);
    const [getSearchInput,setSearchInput] = useState('')
    const [searchSidebar,setSearchSidebar] = useState("new")
    const [getChanenlId,setChannelId] = useState('')
    const [a,seta] = useState('new')
    return(
        <ReactContext.Provider value={{getSidebar,setSidebar,searchSidebar,setSearchSidebar,getChanenlId,a,seta,setChannelId,setSearchInput,getSearchInput}}>
            {children}
        </ReactContext.Provider>
    )
}


export default ContextProvider