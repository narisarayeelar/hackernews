import React from 'react'
import {Loading} from '../Loader'
 // function withFeature(Component) {
//     return function(props){
//         return <Component {...props} />
//     }
// }

const withFeature = (Component) => (props) => <Component {...props} />

const withLoading = (Component) => ({isLoading, ...rest}) => {
    //console.log(isLoading)
    //return (<Loading />)
    return (isLoading ? <Loading /> : <Component {...rest} />)
}
    


export { withFeature, withLoading }