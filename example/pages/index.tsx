import * as React from "react"
// import Skeleton  from  "@component/skeleton"
// import "../../lib/main.min.css"
import Skeleton from "react-awesome-skeleton"
import "react-awesome-skeleton/lib/main.min.css"
class App extends React.Component{
    render(){
        return (
            <div>
                <Skeleton active />
            </div>
        )
    }
}
export default App