import { useEffect } from   "react";
import { request } from "../../utils/request";

function Layout() {
    useEffect(() => {
        request.get('/user/profile')
    }, [])
    
    return (
        <div>我是Layout</div>
    )
}

export default Layout