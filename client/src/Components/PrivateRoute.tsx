import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute:React.FC<{component:React.FC, path: any, exact: boolean, LOGGEDIN: boolean}> = ({component, path, exact, LOGGEDIN}) => {
    
    return LOGGEDIN ? (<Route path={path} exact={exact} component={component} />)
    :
    (<Redirect to='/login' />)
}

export default PrivateRoute;
