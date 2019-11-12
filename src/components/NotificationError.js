import React from 'react'


const NotificationError = ({message}) => {

    const errorStyle = {
        color: 'red',
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
            <div style={errorStyle}>
                {message}
            </div>
        )
    
    }
   

export default NotificationError