import React from "react";

export default function NavBar(listofOptions) {
    let props = listofOptions
    return(
        <div>
            <React.Fragment>
                        <table>
                            <tr>
                            {props.listofOptions.map(option =>{
                                return( 
                            <td>{option}</td>
                                )
                            })}
                            </tr>
                        </table>
            </React.Fragment>
        </div>
    )
}