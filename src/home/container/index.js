import {Base64} from 'js-base64'
const key = Base64.encode(`afd38-bf90c-9d0e6-171cf-c6674-43945:c57d6-71d13-911fc-7a7d1-c98a0-29de6`)
export const Api = (pageNo, query) => 
    fetch(`https://api.shutterstock.com/v2/images/search?query=${query}&page=${pageNo}&per_page=${20}`, {
      method: 'GET',
      headers:{
        Authorization: 'Basic ' + key
      }
    })
