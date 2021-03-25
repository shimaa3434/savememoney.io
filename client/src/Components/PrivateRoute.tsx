import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute:React.FC<{component:React.FC, path: any, exact: boolean, condition:boolean, match?:any}> = ({component, path, exact, condition, match:any}) => {
    
    return condition ? (<Route path={path} exact={exact} component={component} />)
    :
    (<Redirect to='/login' />)
}

export default PrivateRoute;
