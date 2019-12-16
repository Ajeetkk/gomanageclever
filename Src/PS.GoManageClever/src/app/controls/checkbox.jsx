import React from 'react'

export default function CheckBox(props) {
    return (
        <>
            <input type="checkbox" value={props.chkbox} onChange={props.handleChangeChk} />
        </>
    )
}
