
const createDate=(timeStamp)=>{
const date = new Date(timeStamp)
const day = date.getDate()
const month = date.toLocaleString("en-US",{month:'short'})
return `${day} ${month}`
}

export default createDate