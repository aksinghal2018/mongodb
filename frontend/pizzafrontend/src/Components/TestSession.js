import React from 'react'

function TestSession() {
    return (
        <div>
            <form method='POST' action='/'>
                <input type="hidden" name="csrf_token" value="jdljlj3jg84cmfjaldfalJFD#feaDKDKDKDKD==" />
                <label for="username">Username</label>
                <input type="text" name="username" />
                <button type="submit" />
            </form>
        </div>
    )
}

export default TestSession
