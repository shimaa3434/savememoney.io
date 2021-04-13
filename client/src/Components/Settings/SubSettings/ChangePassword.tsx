import React, { useState } from 'react'

const ChangePassword:React.FC<{username:string, pfp:string }> = ({ username, pfp }) => {
    return (
        <div>
            <label></label>
            <input placeholder='Enter old password' />
            <input placeholder='Enter new password' />
            <input placeholder='Re-enter new password' />
        </div>
    )
}

export default ChangePassword
