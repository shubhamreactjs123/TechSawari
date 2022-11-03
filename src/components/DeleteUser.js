import React from 'react'
import { RiCloseLine } from "react-icons/ri";
function DeleteUser({ setIsOpen, deletUser, name, phone }) {
  return (
    <div>
      <div className='darkBG' onClick={() => setIsOpen(false)} />
      <div className='centered'>
        <div className='modal'>
          <button className='closeBtn' onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className='modalContent '>
            Are you sure you want to delete to {name ? name : phone}?
          </div>
          <div className='modalActions'>
            <div className='actionsContainer'>
              <button className='deleteBtn' onClick={() => {
                deletUser()
                setIsOpen(false)
              }}>
                Delete
              </button>
              <button
                className='cancelBtn'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DeleteUser