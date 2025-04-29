
export const createDate=(timeStamp)=>{
const date = new Date(timeStamp)
const day = date.getDate()
const month = date.toLocaleString("en-US",{month:'short'})
return `${day} ${month}`
}


export const dayMonthYear=(timeStamp)=>{
    const date = new Date(timeStamp)
    const day = date.getDate()
    const month = date.toLocaleString("en-US",{month:'short'})
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
    }