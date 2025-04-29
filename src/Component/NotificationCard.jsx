import React from 'react'

const NotificationCard = ({notification}) => {
console.log(notification);

  return (
    <div className='border-b-2 '> 
        <div>
            <img src={notification.user.personal_info.profile_img} alt="" />
            <div>
                <h1>commented your blog</h1>
                <h3></h3>
            </div>
        </div>
    </div>
  )
}

export default NotificationCard