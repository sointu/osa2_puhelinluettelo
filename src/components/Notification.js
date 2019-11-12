import React from 'react'


const Notification = ({message}) => {

    const infoStyle = {
        color: 'green',
        fontStyle: 'bold',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 7,
        marginBottom: 10
    }
    

    if (message === null) {
        return null
    }
    
        return (
            <div style={infoStyle}>
                {message}
            </div>
        )
    
    }
   

export default Notification