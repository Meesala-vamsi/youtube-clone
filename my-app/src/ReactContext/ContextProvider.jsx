import React,{useState} from 'react'
import ReactContext from './Context';

const ContextProvider=({children})=>{
    const [getSidebar,setSidebar] = useState(true);
    const [searchSidebar,setSearchSidebar] = useState("new")
    const [getChanenlId,setChannelId] = useState('')
    return(
        <ReactContext.Provider value={{getSidebar,setSidebar,searchSidebar,setSearchSidebar,setChannelId}}>
            {children}
        </ReactContext.Provider>
    )
}


export default ContextProvider