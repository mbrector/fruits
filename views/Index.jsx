const React = require('react')

class Index extends React.Component{
    render() {
        return (
        <div>
            <h1>Fruits Index Page</h1>
            <ul>
                {
                    this.props.fruits.map((fruit, i) => {
                        return (
                            <li>
                               The <a href = {`/fruits/${ fruit.id }`}>{ fruit.name } </a> is { fruit.color }
                               { fruit.readyToEat ? ` It is ready to eat` : ` It is not ready to eat` }     
                            </li>
                        )
                    })
                }
            </ul>
            <nav>
                <a href="fruits/new">Create a New Fruit</a>
            </nav>
        </div> )
    }
}

module.exports = Index

//destructuring
        // const {fruits} = this.props
        // return(
        //     <div>
        //         <h1>Fruits Index Page</h1>
        //         <ul>
        //             {fruits.map((fruit, i)=>{
        //                 return(
        //                     <li>
        //                         The {' '}
        //                         <a href = {`/fruits/${i}`}>
        //                             {fruit.name}
        //                         </a>{' '}
        //                         is {fruit.color}<br></br>
        //                         {fruit.readyToEat
        //                             ? `It is ready to eat`
        //                             : `It is not ready to eat...cant touch this`
        //                         }
        //                         <br />
        //                     </li>
        //                 )
        //             })}
        //         </ul>
        //         <nav>
        //             <a href="/fruits/new">Create a New Fruit</a>
        //         </nav>
        //     </div>
        // )